import { Module } from '@nestjs/common';
import { PassengersController } from './passengers.controller';
import { ProxyModule } from '../common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [PassengersController]
})
export class PassengersModule { }
