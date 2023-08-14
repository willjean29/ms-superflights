import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';
import { UserDto } from '../users/dto/user.dto';
import { IUserSession } from 'src/common/interfaces/user-session.interface';
import { ClientProxySuperFlight } from 'src/common/proxy/client-proxy';
import { UsersMsg } from 'src/common/enum/rabbitmq.enum';


export interface IUserTemp {
  userId: number;
  username: string;
  password: string;
}
@Injectable()
export class AuthService {

  constructor(
    private readonly clientProxySuperFlight: ClientProxySuperFlight,
    private readonly jwtService: JwtService,
  ) { }
  private clientProxyUser = this.clientProxySuperFlight.clientProxyUsers();
  async signIn(signInDto: SignInDto): Promise<IUserSession> {
    const user = await this.clientProxyUser.send(UsersMsg.ValidUser, signInDto).toPromise();
    return {
      user,
      token: this.getJwtToken({ id: user._id }),
    };
  }

  async signUp(userDto: UserDto): Promise<IUserSession> {
    const user = await this.clientProxyUser.send(UsersMsg.CreateUser, userDto).toPromise();
    return {
      user,
      token: this.getJwtToken({ id: user._id }),
    };
  }

  private getJwtToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }
}

