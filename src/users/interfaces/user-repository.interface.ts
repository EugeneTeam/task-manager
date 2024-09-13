import { IUser } from './user.interface';

export interface IUserRepository<T> {
  updateRefreshTokenById(
    id: number,
    refreshToken: string | null,
  ): Promise<void>;
  insert(params: IInsertOneUser): Promise<void>;
  getByEmail(email: string): Promise<T>;
  getPasswordHashAndIdByEmail(
    email: string,
  ): Promise<IIdAndPasswordHash | null>;
}

// todo rename
export interface IInsertOneUser
  extends Omit<IUser, 'id' | 'status' | 'refresh_token'> {
  password_hash: string;
}

export interface IIdAndPasswordHash {
  password_hash: string;
  id: number;
}
