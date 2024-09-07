import { IUser } from './user.interface';

export interface IUserRepository<T> {
  findOneByEmail(email: string): Promise<T>;
  insertOne(params: IInsertOneUser): Promise<void>;
  getUserPasswordHashByEmail(email: string): Promise<string | null>;
}

export interface IInsertOneUser extends Omit<IUser, 'id' | 'status'> {
  password_hash: string;
}
