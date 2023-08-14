import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Collections } from '../common/models/collections';
import { FlightSchema } from './schemas/flight.schema';
import { PassengerSchema } from './schemas/passenger.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Collections.Flights,
        useFactory: () => {
          return FlightSchema.plugin(require('mongoose-autopopulate'));
        }
      },
      {
        name: Collections.Passenger,
        useFactory: () => {
          return PassengerSchema
        }
      }
    ])
  ],
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class FlightsModule { }
