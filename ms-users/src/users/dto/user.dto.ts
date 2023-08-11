import { UserRoles } from "../../common/enum/roles.enum";

export class UserDto {
  readonly name: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly roles: UserRoles[];
}