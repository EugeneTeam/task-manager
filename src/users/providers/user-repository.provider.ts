import { Provider } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { USER_REPO_PROVIDER_KEY } from '../constants/providers.constants';

export const userRepositoryProvider: Provider = {
  provide: USER_REPO_PROVIDER_KEY,
  useClass: UserRepository,
};
