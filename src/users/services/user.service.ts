import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { ISignUpRequest } from '../interfaces/requests/sign-up-request.interface';
import { CustomError } from '../../common/errors/custom.error';
import { BcryptService } from '../../common/services/bcrypt.service';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  public async signUp({
    password,
    email,
    last_name,
    first_name,
  }: ISignUpRequest): Promise<boolean> {
    const user = await this._userRepository.findOneByEmail(email);

    if (user) {
      throw new CustomError('EmailIsUsed');
    }

    const passwordHash = await BcryptService.hash(password);

    await this._userRepository.insertOne({
      last_name,
      first_name,
      email,
      password_hash: passwordHash,
    });

    return true;
  }

  public async signIn(
    password: string,
    email: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const userPasswordHash =
      await this._userRepository.getUserPasswordHashByEmail(email);

    if (!userPasswordHash) {
      throw new CustomError('UserNotFound');
    }

    const isValidPassword = await BcryptService.compare(
      password,
      userPasswordHash,
    );

    if (!isValidPassword) {
      throw new CustomError('InvalidCredential');
    }

    // todo add logic
    return {
      access_token: '',
      refresh_token: '',
    };
  }
}
