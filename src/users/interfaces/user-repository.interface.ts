import { IUser } from './user.interface';

export interface IUserRepository<T> {
  findOneByEmail(email: string): Promise<T>;
}

export interface IInsertOneUser extends Omit<IUser, 'id' | 'status'> {
  password_hash: string;
}
