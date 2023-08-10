import { Module } from '@nestjs/common';
import { FlightsController } from './flights.controller';
import { ProxyModule } from '../common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [FlightsController]
})
export class FlightsModule { }
