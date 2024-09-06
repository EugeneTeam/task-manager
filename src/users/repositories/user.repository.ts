import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
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
    private readonly _repository: Repository<UserEntity>,
  ) {
    super(_repository);
  }

  @NormalizeInputParams()
  public async insertOne({
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
  public async findOneByEmail(email: string): Promise<IUser> {
    return this.getItem(
      `SELECT * FROM ${TABLE_NAMES.USERS} WHERE email = '${email}';`,
    );
  }
}
