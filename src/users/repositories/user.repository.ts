import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { IUser } from '../interfaces/user.interface';
import { TABLE_NAMES } from '../../common/constants/table-names.constants';
import { RepositoryExtend } from '../../common/extends/repository.extend';
import { replaceSpecialSymbol } from '../../common/utils/replace-special-symbol.util';

@Injectable()
export class UserRepository
  extends RepositoryExtend<UserRepository, IUser>
  implements IUserRepository<IUser>
{
  constructor(
    @InjectRepository(UserRepository)
    private readonly _repository: Repository<UserRepository>,
  ) {
    super(_repository);
  }

  public async findOneByEmail(email: string): Promise<IUser> {
    return this.getItem(
      `SELECT * FROM ${TABLE_NAMES.USERS} WHERE email = ${replaceSpecialSymbol(
        email,
      )};`,
    );
  }
}
