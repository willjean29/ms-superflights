import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientProxySuperFlight } from '../common/proxy/client-proxy';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { PassengersMsg } from '../common/enum/rabbitmq.enum';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { IPassenger } from '../common/interfaces/passenger.interface';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('passengers')
@Controller('passengers')
export class PassengersController {
  constructor(private readonly clientProxySuperFlight: ClientProxySuperFlight) { }

  private clientProxyPassenger = this.clientProxySuperFlight.clientProxyPassengers();

  @Post()
  create(@Body() createPassengerDto: CreatePassengerDto): Observable<IPassenger> {
    return this.clientProxyPassenger.send(PassengersMsg.CreatePassenger, createPassengerDto);
  }

  @Get()
  findAll(): Observable<IPassenger[]> {
    return this.clientProxyPassenger.send(PassengersMsg.FindAll, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IPassenger> {
    return this.clientProxyPassenger.send(PassengersMsg.FindOne, id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePassengerDto: UpdatePassengerDto): Observable<IPassenger> {
    return this.clientProxyPassenger.send(PassengersMsg.Update, { id, updatePassengerDto });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<IPassenger> {
    return this.clientProxyPassenger.send(PassengersMsg.Delete, id);
  }

}
