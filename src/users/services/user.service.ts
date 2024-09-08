import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { ISignUpRequest } from '../interfaces/requests/sign-up-request.interface';
import { CustomError } from '../../common/errors/custom.error';
import { ArgonService } from '../../common/services/bcrypt.service';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  // todo remove it
  public async signUp({
    password,
    email,
    last_name,
    first_name,
  }: ISignUpRequest): Promise<boolean> {
    const user = await this._userRepository.getByEmail(email);

    if (user) {
      throw new CustomError('EmailIsUsed');
    }

    const passwordHash = await ArgonService.hash(password);

    await this._userRepository.insert({
      last_name,
      first_name,
      email,
      password_hash: passwordHash,
    });

    return true;
  }

  // todo remove it
  public async signIn(
    password: string,
    email: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const userInfo = await this._userRepository.getPasswordHashAndIdByEmail(
      email,
    );

    if (!userInfo) {
      throw new CustomError('UserNotFound');
    }

    const isValidPassword = await ArgonService.compare(
      password,
      userInfo.password_hash,
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
