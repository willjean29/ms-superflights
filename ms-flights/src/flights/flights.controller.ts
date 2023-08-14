import { Controller } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { MongoIdValidationPipe } from '../common/pipes/MongoIdValidationPipe';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlightsMsg } from '../common/enum/rabbitmq.enum';


@Controller()
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) { }

  @MessagePattern(FlightsMsg.CreateFlight)
  create(@Payload() createFlightDto: CreateFlightDto) {
    return this.flightsService.create(createFlightDto);
  }

  @MessagePattern(FlightsMsg.FindAll)
  findAll() {
    return this.flightsService.findAll();
  }

  @MessagePattern(FlightsMsg.FindOne)
  findOne(@Payload(new MongoIdValidationPipe()) id: string) {
    return this.flightsService.findOne(id);
  }

  @MessagePattern(FlightsMsg.Update)
  update(@Payload(new MongoIdValidationPipe()) payload: { id: string, updateFlightDto: UpdateFlightDto }) {
    return this.flightsService.update(payload.id, payload.updateFlightDto);
  }

  @MessagePattern(FlightsMsg.Delete)
  remove(@Payload(new MongoIdValidationPipe()) id: string) {
    return this.flightsService.remove(id);
  }

  @MessagePattern(FlightsMsg.AddPassenger)
  addPassenger(@Payload(new MongoIdValidationPipe()) payload: { id: string, passengerId: string }) {
    return this.flightsService.addPassenger(payload.id, payload.passengerId);
  }
}
