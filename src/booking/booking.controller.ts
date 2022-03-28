import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { AddBookingDto } from './dto/addBooking.dto';

@Controller()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  getHello(): any {
    return this.bookingService.findAll();
  }
  @Post()
  addBooking(@Body() addBooking: AddBookingDto): any {
    return this.bookingService.bookField(addBooking);
  }
}
