import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientProxySuperFlight } from '../common/proxy/client-proxy';
import { CreateFlightDto } from './dto/create-flight.dto';
import { FlightsMsg, PassengersMsg } from '../common/enum/rabbitmq.enum';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { IFlight } from '../common/interfaces/flight.interface';
import { Observable } from 'rxjs';

@Controller('flights')
export class FlightsController {
  constructor(private readonly clientProxySuperFlight: ClientProxySuperFlight) { }

  private clientProxyFlight = this.clientProxySuperFlight.clientProxyFlights();
  private clientProxyPassenger = this.clientProxySuperFlight.clientProxyPassengers();

  @Post()
  create(@Body() createFlightDto: CreateFlightDto): Observable<IFlight> {
    return this.clientProxyFlight.send(FlightsMsg.CreateFlight, createFlightDto);
  }

  @Get()
  findAll(): Observable<IFlight[]> {
    return this.clientProxyFlight.send(FlightsMsg.FindAll, '');
  }

  @Get('id')
  findOne(@Param('id') id: string): Observable<IFlight> {
    return this.clientProxyFlight.send(FlightsMsg.FindOne, id);
  }

  @Put('id')
  update(@Param('id') id: string, @Body() updateFlightDto: UpdateFlightDto): Observable<IFlight> {
    return this.clientProxyFlight.send(FlightsMsg.Update, { id, updateFlightDto });
  }

  @Delete('id')
  delete(@Param('id') id: string): Observable<IFlight> {
    return this.clientProxyFlight.send(FlightsMsg.Delete, id);
  }

  @Post(':fligthId/passengers/:passengerId')
  async addPassenger(@Param('fligthId') fligthId: string, @Param('passengerId',) passengerId: string) {
    const passenger = await this.clientProxyPassenger.send(PassengersMsg.FindOne, passengerId).toPromise()
    if (!passenger) {
      throw new BadRequestException('Pass')
    }
    return this.clientProxyFlight.send(FlightsMsg.AddPassenger, { fligthId, passengerId })
  }
}
