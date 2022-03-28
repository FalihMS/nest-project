import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookingModule } from './booking/booking.module';
import { VenueModule } from './venue/venue.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    VenueModule,
    BookingModule,
    ConfigModule.forRoot(),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        models: [],
        logging: configService.get<string>('DB_LOGGING') == 'true',
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    RouterModule.register([
      {
        path: 'venue',
        module: VenueModule,
      },
      {
        path: 'booking',
        module: BookingModule,
      },
    ]),
  ],
})
export class AppModule {}
