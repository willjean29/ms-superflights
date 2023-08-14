import { Controller } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { MongoIdValidationPipe } from '../common/pipes/MongoIdValidationPipe';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PassengersMsg } from '../common/enum/rabbitmq.enum';

@Controller()
export class PassengersController {
  constructor(private readonly passengersService: PassengersService) { }

  @MessagePattern(PassengersMsg.CreatePassenger)
  create(@Payload() createPassengerDto: CreatePassengerDto) {
    return this.passengersService.create(createPassengerDto);
  }

  @MessagePattern(PassengersMsg.FindAll)
  findAll() {
    return this.passengersService.findAll();
  }

  @MessagePattern(PassengersMsg.FindOne)
  findOne(@Payload(new MongoIdValidationPipe()) id: string) {
    return this.passengersService.findOne(id);
  }

  @MessagePattern(PassengersMsg.Update)
  update(@Payload(new MongoIdValidationPipe()) payload: { id: string, updatePassengerDto: UpdatePassengerDto }) {
    return this.passengersService.update(payload.id, payload.updatePassengerDto);
  }

  @MessagePattern(PassengersMsg.Delete)
  remove(@Payload(new MongoIdValidationPipe()) id: string) {
    return this.passengersService.remove(id);
  }
}
