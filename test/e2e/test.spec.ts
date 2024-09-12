import { TestingModule } from '@nestjs/testing';
import { mainModule } from '../main-module';
import { userFactory } from '../factories/user.factory';

describe('test', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await mainModule.getModule();
  });

  // todo delete after setting up tests
  it('should create user in db', async () => {
    const user = await userFactory.insertUser({});
    const r = user;
  });
});
