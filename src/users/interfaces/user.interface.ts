import { UserStatusesEnum } from '../enums/user-statuses.enum';

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  status: UserStatusesEnum;
  refresh_token?: string;
}
