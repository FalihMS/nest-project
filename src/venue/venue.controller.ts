import { Controller, Get, Param, Query } from '@nestjs/common';
import { FieldService } from './service/field.service';
import { PricelistService } from './service/pricelist.service';
import { VenueService } from './service/venue.service';

@Controller()
export class VenueController {
  constructor(
    private readonly venueService: VenueService,
    private readonly fieldService: FieldService,
    private readonly pricelistService: PricelistService,
  ) {}

  @Get()
  getHello(): any {
    return this.venueService.findAll();
  }

  @Get('/pricelists/:uid')
  findPricelist(@Param() params) {
    return this.pricelistService.findPricelist(params.uid);
  }

  @Get('/available')
  findAvailableField(@Query() query: any) {
    return this.fieldService.availableFields(query);
  }

  @Get(':uid')
  findOne(@Param() params) {
    return this.venueService.findVenue(params.uid);
  }

  @Get(':uid/fields')
  findField(@Param() params) {
    return this.fieldService.findFields(params.uid);
  }

  // @Get(':uid/fields/available')
  // findAvailableField(@Param() params) {
  //   return this.fieldService.availableFields(params.uid);
  // }

  @Get(':uid/pricelists')
  findPricelistByVenue(@Param() params) {
    return this.pricelistService.findPricelistByVenue(params.uid);
  }
}
