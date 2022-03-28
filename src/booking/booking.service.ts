import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AddBookingDto } from './dto/addBooking.dto';
import { Booking } from './model/booking.model';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking)
    private bookingModel: typeof Booking,
  ) {}

  async findAll(): Promise<Booking[]> {
    return await this.bookingModel.findAll();
  }

  async bookField(addBooking: AddBookingDto): Promise<Booking> {
    return await this.bookingModel.create({
      fieldUid: addBooking.fieldUid,
      name: addBooking.name,
      phoneNo: addBooking.phoneNo,
      date: addBooking.date,
      time: addBooking.time,
      duration: addBooking.duration,
    });
  }
}
