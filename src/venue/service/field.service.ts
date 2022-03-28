/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BookingService } from '../../booking/booking.service';
import { Field } from '../model/field.model';
import {
} from '../model/pricelist.model';

@Injectable()
export class FieldService {
  constructor(
    @InjectModel(Field)
    private fieldModel: typeof Field,
    private readonly bookingService: BookingService,
  ) {}

  async findFields(uid: string): Promise<Field[]> {
    const field = await this.fieldModel.findAll({
      attributes: ['uid', 'pricelistUid', 'name', 'type', 'status'],
      where: { venueUid: uid },
    });

    return field;
  }

  async availableFields(query: any) {
    
    //map query
    const { date, venueUid } = query;

    //getFieldData
    const fields = await this.fieldModel.findAll({
      attributes: ['uid', 'name', 'type'],
      where: { venueUid },
    });

    //mapAvailableSlot
    const availableSlot = this.generateSlot(fields);

    //getBookingData (dummy)
    const dummyData = await this.getBookingData(date);
    
    //filterAvailableData
    dummyData.map((booking) => {
      for (let duration = 0; duration < booking.duration; duration++) {
        const index = booking.time - 1 + duration;
        availableSlot[index].fields = availableSlot[index].fields.filter((field) => {
          return field.uid != booking.fieldUid;
        });
      }
    });

    //returnArray
    return { date, availableSlot }
  }

  async getBookingData(date: string): Promise<any[]> {
      return await this.bookingService.findAll();
  }

  generateSlot(fields: Field[]) {
      const slot = [];
      for (let time = 1; time <= 24; time++) {
        slot.push({ time, fields });
      }
      return slot;
  }
  
}
