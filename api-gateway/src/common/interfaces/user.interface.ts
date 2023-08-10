import { UserRoles } from "../enum/roles.enum";

export interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
  roles: UserRoles[];
}