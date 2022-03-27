import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Field } from './model/field.model';
import {
  DailyPricelist,
  Pricelist,
  WeeklyPricelist,
} from './model/pricelist.model';
import { Venue } from './model/venue.model';
import { VenueController } from './venue.controller';
import { VenueService } from './service/venue.service';
import { FieldService } from './service/field.service';
import { PricelistService } from './service/pricelist.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Venue,
      Field,
      Pricelist,
      WeeklyPricelist,
      DailyPricelist,
    ]),
  ],
  controllers: [VenueController],
  providers: [VenueService, FieldService, PricelistService],
})
export class VenueModule {}
