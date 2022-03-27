import { Body, Controller, Get, Post } from '@nestjs/common';
import { SlotService } from './slot.service';

@Controller()
export class SlotController {
  constructor(private readonly slotService: SlotService) {}

  @Get()
  getHello(): any {
    return this.slotService.findAll();
  }

  @Post('/generate')
  generateSlot(@Body() input): any {
    return this.slotService.generateSlot(input);
  }
}
