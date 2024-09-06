import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { ISignUpRequest } from '../interfaces/requests/sign-up-request.interface';
import { hash } from 'bcrypt';

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
      // todo move messages
      throw new BadRequestException('User already exists');
    }

    // todo move [10]
    const passwordHash = await hash(password, 10);

    await this._userRepository.insertOne({
      last_name,
      first_name,
      email,
      password_hash: passwordHash,
    });

    return true;
  }
}
