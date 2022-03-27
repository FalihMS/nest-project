import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Field } from '../model/field.model';
import {
  DailyPricelist,
  Pricelist,
  WeeklyPricelist,
} from '../model/pricelist.model';
import { Venue } from '../model/venue.model';

@Injectable()
export class PricelistService {
  constructor(
    @InjectModel(Pricelist)
    private pricelistModel: typeof Pricelist,
  ) {}

  async findPricelistByVenue(uid): Promise<Pricelist[]> {
    const pricelist = await this.pricelistModel.findAll({
      attributes: ['uid', 'name'],
      include: [
        {
          model: Field,
          attributes: [],
          required: true,
          include: [
            {
              model: Venue,
              attributes: [],
              where: { uid },
            },
          ],
        },
        {
          model: WeeklyPricelist,
          attributes: ['uid', 'name'],
        },
      ],
    });
    return pricelist;
  }

  async findPricelist(uid): Promise<Pricelist[]> {
    const pricelist = await this.pricelistModel.findAll({
      attributes: ['uid', 'name'],
      where: { uid },
      include: [
        {
          model: Field,
          attributes: ['uid', 'name'],
        },
        {
          model: WeeklyPricelist,
          attributes: ['uid', 'name', 'dayStart', 'dayEnd'],
          include: [
            {
              model: DailyPricelist,
              attributes: [
                'uid',
                'name',
                'timeStart',
                'timeEnd',
                'priceAmount',
              ],
            },
          ],
        },
      ],
    });
    return pricelist;
  }
}
