import { Controller } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersMsg } from '../common/enum/rabbitmq.enum';
import { MongoIdValidationPipe } from '../common/pipes/MongoIdValidationPipe';
import { SignInDto } from './dto/signin.dto';

@Controller()
export class UsersController {
  constructor(
    private usersService: UsersService
  ) { };

  @MessagePattern(UsersMsg.CreateUser)
  create(@Payload() userDto: UserDto) {
    return this.usersService.create(userDto)
  }

  @MessagePattern(UsersMsg.UpdateRoles)
  updateRoles() {
    return this.usersService.updateExistingUsersWithDefaultRole()
  }

  @MessagePattern(UsersMsg.FindOne)
  findOne(@Payload(new MongoIdValidationPipe()) id: string) {
    return this.usersService.findOne(id)
  }

  @MessagePattern(UsersMsg.FindAll)
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern(UsersMsg.Update)
  update(@Payload(new MongoIdValidationPipe()) payload: { id: string, userDto: UserDto }) {
    return this.usersService.update(payload.userDto, payload.id);
  }

  @MessagePattern(UsersMsg.Delete)
  delete(@Payload(new MongoIdValidationPipe()) id: string) {
    return this.usersService.delete(id);
  }

  @MessagePattern(UsersMsg.ValidUser)
  validateUser(@Payload() signInDto: SignInDto) {
    return this.usersService.validateUser(signInDto);
  }
}
