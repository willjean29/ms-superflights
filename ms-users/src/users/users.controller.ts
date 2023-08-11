import { Controller } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

// import { MongoIdValidationPipe } from '../common/pipes/MongoIdValidationPipe';
import { UsersMsg } from '../common/enum/rabbitmq.enum';

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
  findOne(@Payload() id: string) {
    return this.usersService.findOne(id)
  }

  @MessagePattern(UsersMsg.FindAll)
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern(UsersMsg.Update)
  update(@Payload() payload: any) {
    return this.usersService.update(payload.userDto, payload.id);
  }

  @MessagePattern(UsersMsg.Delete)
  deleteOnte(@Payload() id: string) {
    return this.usersService.deleteOne(id);
  }
}
