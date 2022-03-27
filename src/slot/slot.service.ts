import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Slot } from './model/slot.model';

@Injectable()
export class SlotService {
  constructor(
    @InjectModel(Slot)
    private slotModel: typeof Slot,
  ) {}

  async findAll(): Promise<Slot[]> {
    return this.slotModel.findAll({
      attributes: ['uid', 'fieldUid', 'date', 'time', 'bookingPrice'],
      order: ['fieldUid', 'date', 'time'],
      where: {
        slotTaken: 'A',
      },
    });
  }

  async generateSlot(input: any): Promise<any> {
    let slot = [];
    const week = this.sortInput(input.weeklyPricelist, 'dayStart');

    do {
      slot = this.generateWeeklySlot(slot, input.fields, week.shift());
    } while (week.length > 0);

    this.slotModel.bulkCreate(slot);

    return slot;
  }

  generateWeeklySlot(slot: any[], field: any[], week: any) {
    for (let index = week.dayStart; index <= week.dayEnd; index++) {
      const day = this.sortInput(week.dailyPricelist, 'timeStart');

      for (let indexJ = 0; indexJ < day.length; indexJ++) {
        slot = this.generateDailySlot(slot, field, day[indexJ], index);
      }
    }
    return slot;
  }

  generateDailySlot(
    slot: any[],
    field: any[],
    day: any,
    dayIndex: number,
  ): any[] {
    for (let index = day.timeStart; index <= day.timeEnd; index++) {
      for (let indexField = 0; indexField < field.length; indexField++) {
        slot.push({
          fieldUid: field[indexField],
          date: dayIndex,
          time: index,
          bookingPrice: day.priceAmount,
        });
      }
    }
    return slot;
  }

  sortInput(week: any[], column: string) {
    week.sort((a, b) => {
      return a[column] - b[column];
    });
    return week;
  }
}
