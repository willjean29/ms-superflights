import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PassengersModule } from './passengers/passengers.module';
import { FlightsModule } from './flights/flights.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), UsersModule, PassengersModule, FlightsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
