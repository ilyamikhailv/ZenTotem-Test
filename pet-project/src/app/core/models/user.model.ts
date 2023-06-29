import { RoleEnum } from '../enums/role.enum';

export interface UserModel {
  login: string;
  role: RoleEnum;
  name?: string;
  lastName?: string;
  middleName?: string;
}
