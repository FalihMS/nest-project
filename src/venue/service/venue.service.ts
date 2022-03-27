import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Venue } from '../model/venue.model';
import { FieldService } from './field.service';
import { PricelistService } from './pricelist.service';

@Injectable()
export class VenueService {
  constructor(
    @InjectModel(Venue)
    private venueModel: typeof Venue,
    private readonly fieldService: FieldService,
    private readonly pricelistService: PricelistService,
  ) {}

  async findAll(): Promise<Venue[]> {
    return this.venueModel.findAll();
  }

  async findVenue(uid): Promise<any> {
    const venue = await this.venueModel.findOne({
      where: { uid },
    });

    const fields = await this.fieldService.findFields(uid);

    const pricelists = await this.pricelistService.findPricelistByVenue(uid);

    return { venue, fields, pricelists };
  }
}
