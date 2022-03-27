import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { SlotModule } from './slot/slot.module';
import { VenueModule } from './venue/venue.module';

@Module({
  imports: [
    VenueModule,
    SlotModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nest',
      password: 'password',
      database: 'nest',
      models: [],
      autoLoadModels: true,
      synchronize: true,
    }),
    RouterModule.register([
      {
        path: 'venue',
        module: VenueModule,
      },
      {
        path: 'slot',
        module: SlotModule,
      },
    ]),
  ],
})
export class AppModule {}
