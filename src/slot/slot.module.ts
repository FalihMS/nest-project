import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Slot } from './model/slot.model';
import { SlotController } from './slot.controller';
import { SlotService } from './slot.service';

@Module({
  imports: [SequelizeModule.forFeature([Slot])],
  controllers: [SlotController],
  providers: [SlotService],
})
export class SlotModule {}
