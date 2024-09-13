import { TestingModule } from '@nestjs/testing';
import { mainModule } from '../main-module';
import { LENGTH_CONSTRAINT } from '../../src/common/constraints/length.constraints';
import { ISignInRequest } from '../../src/users/interfaces/requests/sign-in-request.interface';
import { faker } from '@faker-js/faker';
import * as supertest from 'supertest';
import { USER_ROUTING } from '../../src/users/constants/routing.constants';
import { HttpServer, HttpStatus, INestApplication } from '@nestjs/common';
import { DbUtils } from '../utils/db.utils';
import { userFactory } from '../factories/user.factory';
import { CustomError } from '../../src/common/errors/custom.error';
import { UserEntity } from '../../src/users/entities/user.entity';

describe('On User Controller', () => {
  let module: TestingModule,
    app: INestApplication,
    httpServer: HttpServer,
    dbUtils: DbUtils;

  beforeAll(async () => {
    module = await mainModule.getModule();
    app = await mainModule.getApp();
    httpServer = app.getHttpServer();
    dbUtils = module.get(DbUtils);
  });

  afterEach(async () => {
    await dbUtils.clear();
  });

  afterAll(() => {
    mainModule.close();
  });

  describe('On Sign In', () => {
    let params: ISignInRequest, user: UserEntity;

    beforeEach(async () => {
      params = {
        email: faker.internet.email(),
        password: faker.string.sample(8),
      };

      user = await userFactory.insertUser({
        email: params.email,
        password: params.password,
      });
    });

    it('should return 400 if them email is invalid', async () => {
      params.email = 'invalidemail@gmail@gmail.com';
      await supertest(httpServer)
        .post(`${USER_ROUTING.MAIN}${USER_ROUTING.SIGN_IN}`)
        .send(params)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it(`should return 400 if the email length greater than ${LENGTH_CONSTRAINT.EMAIL}`, async () => {
      params.email = 'invalidemail@gmail@gmail.com'.repeat(5);
      await supertest(httpServer)
        .post(`${USER_ROUTING.MAIN}${USER_ROUTING.SIGN_IN}`)
        .send(params)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 if the email absent', async () => {
      delete params.email;
      await supertest(httpServer)
        .post(`${USER_ROUTING.MAIN}${USER_ROUTING.SIGN_IN}`)
        .send(params)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 404 if user not found', async () => {
      params.email = faker.internet.email();
      const response = await supertest(httpServer)
        .post(`${USER_ROUTING.MAIN}${USER_ROUTING.SIGN_IN}`)
        .send(params)
        .expect(HttpStatus.NOT_FOUND);

      const error = new CustomError('UserNotFound');
      expect(response.body.success).toEqual(false);
      expect(response.body.error.message).toEqual(error.message);
      expect(response.body.error.code).toEqual(error.code);
    });

    it('should return 401 if credential is invalid', async () => {
      params.password += '1';
      const response = await supertest(httpServer)
        .post(`${USER_ROUTING.MAIN}${USER_ROUTING.SIGN_IN}`)
        .send(params)
        .expect(HttpStatus.UNAUTHORIZED);

      const error = new CustomError('InvalidCredential');
      expect(response.body.success).toEqual(false);
      expect(response.body.error.message).toEqual(error.message);
      expect(response.body.error.code).toEqual(error.code);
    });

    it('should return 200 and tokens', async () => {
      const response = await supertest(httpServer)
        .post(`${USER_ROUTING.MAIN}${USER_ROUTING.SIGN_IN}`)
        .send(params)
        .expect(HttpStatus.OK);

      expect(response.body.access_token).not.toBeUndefined();
      expect(response.body.refresh_token).not.toBeUndefined();
    });
  });
});
