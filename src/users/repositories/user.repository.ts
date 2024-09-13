import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IIdAndPasswordHash,
  IInsertOneUser,
  IUserRepository,
} from '../interfaces/user-repository.interface';
import { IUser } from '../interfaces/user.interface';
import { TABLE_NAMES } from '../../common/constants/table-names.constants';
import { RepositoryExtend } from '../../common/extends/repository.extend';
import { UserEntity } from '../entities/user.entity';
import { NormalizeInputParams } from '../../common/decorators/normalize-input-params.decorator';

@Injectable()
export class UserRepository
  extends RepositoryExtend<UserEntity, IUser>
  implements IUserRepository<IUser>
{
  constructor(
    @InjectRepository(UserEntity)
    readonly _repository: Repository<UserEntity>,
  ) {
    super(_repository);
  }

  public async updateRefreshTokenById(
    id: number,
    refreshToken: string | null,
  ): Promise<void> {
    await this._repository.query(`
      UPDATE ${TABLE_NAMES.USERS} SET refresh_token = ${
      typeof refreshToken === 'string' ? `'${refreshToken}'` : `null`
    } WHERE id = ${id};
    `);
  }

  @NormalizeInputParams()
  public async insert({
    last_name,
    first_name,
    password_hash,
    email,
  }: IInsertOneUser): Promise<void> {
    await this._repository.query(`
      INSERT INTO ${TABLE_NAMES.USERS} (first_name, last_name, email, status, password_hash) 
      VALUES ('${first_name}', '${last_name}', '${email}', DEFAULT, '${password_hash}')
    `);
  }

  @NormalizeInputParams()
  public async getByEmail(email: string): Promise<IUser> {
    return this.getItem(
      `SELECT * FROM ${TABLE_NAMES.USERS} WHERE email = '${email}';`,
    );
  }

  @NormalizeInputParams()
  public async getPasswordHashAndIdByEmail(
    email: string,
  ): Promise<IIdAndPasswordHash | null> {
    return this.getItem<IIdAndPasswordHash>(
      `SELECT password_hash, id FROM ${TABLE_NAMES.USERS} WHERE email = '${email}'`,
    );
  }
}
