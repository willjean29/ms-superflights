import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from "../../common/interfaces/jwt-payload.interface";
import { ClientProxySuperFlight } from "src/common/proxy/client-proxy";
import { UsersMsg } from "src/common/enum/rabbitmq.enum";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly clientProxySuperFlight: ClientProxySuperFlight,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }
  private clientProxyUser = this.clientProxySuperFlight.clientProxyUsers();

  async validate(payload: JwtPayload) {
    const { id } = payload;
    const user = await this.clientProxyUser.send(UsersMsg.FindOne, id).toPromise();
    return user;
  }
}