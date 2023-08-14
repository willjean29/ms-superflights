import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxySuperFlight } from '../common/proxy/client-proxy';
import { UserDto } from './dto/user.dto';
import { UsersMsg } from '../common/enum/rabbitmq.enum';
import { Observable } from 'rxjs';
import { IUser } from '../common/interfaces/user.interface';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly clientProxySuperFlight: ClientProxySuperFlight
  ) { }

  private clientProxyUser = this.clientProxySuperFlight.clientProxyUsers();

  @Post()
  create(@Body() userDto: UserDto): Observable<IUser[]> {
    return this.clientProxyUser.send(UsersMsg.CreateUser, userDto);
  }

  @Get()
  findAll(): Observable<IUser> {
    return this.clientProxyUser.send(UsersMsg.FindAll, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IUser> {
    return this.clientProxyUser.send(UsersMsg.FindOne, id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userDto: UserDto): Observable<IUser> {
    return this.clientProxyUser.send(UsersMsg.Update, { id, userDto });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<IUser> {
    return this.clientProxyUser.send(UsersMsg.Delete, id);
  }
}
