import { UserStatusesEnum } from '../../src/users/enums/user-statuses.enum';
import { IUser } from '../../src/users/interfaces/user.interface';
import { faker } from '@faker-js/faker';
import { getRandomValue } from '../utils/get-random-value.util';
import { mainModule, MainModule } from '../main-module';
import { UserRepository } from '../../src/users/repositories/user.repository';
import { UserEntity } from '../../src/users/entities/user.entity';
import { ArgonService } from '../../src/common/services/bcrypt.service';

type insertUserType = {
  email?: string;
  last_name?: string;
  first_name?: string;
  status?: UserStatusesEnum;
  refresh_token?: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
};

export class UserFactory {
  public async insertUser({
    email = faker.internet.email(),
    refresh_token = '',
    password = '',
    last_name = faker.person.firstName(),
    first_name = faker.person.lastName(),
    status = UserStatusesEnum.active,
    created_at = new Date(),
    updated_at = new Date(),
  }: insertUserType): Promise<UserEntity> {
    const app = await mainModule.getModule();

    const userRepo = app.get(UserRepository);

    const user = userRepo._repository.create({
      last_name,
      first_name,
      email,
      password_hash: await ArgonService.hash(password),
      refresh_token,
      status,
      created_at,
      updated_at,
    });

    return userRepo._repository.save(user);
  }
}

export const userFactory = new UserFactory();
