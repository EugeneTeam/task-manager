import { Inject, Injectable } from '@nestjs/common';
import { USER_REPO_PROVIDER_KEY } from '../../users/constants/providers.constants';
import { IUserRepository } from '../../users/interfaces/user-repository.interface';
import { IUser } from '../../users/interfaces/user.interface';
import { CustomError } from '../../common/errors/custom.error';
import { ArgonService } from '../../common/services/bcrypt.service';
import { ITokens } from '../interfaces/tokens.interfaces';
import { JwtService } from '@nestjs/jwt';
import { configService } from '../../common/services/config.service';
import { ISignInRequest } from '../../users/interfaces/requests/sign-in-request.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPO_PROVIDER_KEY)
    private readonly _userRepository: IUserRepository<IUser>,
    private readonly _jwtService: JwtService,
  ) {}

  public async signUp({
    email,
    password,
    last_name,
    first_name,
  }): Promise<boolean> {
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

  public async signIn({ email, password }: ISignInRequest): Promise<ITokens> {
    const userInfo = await this._userRepository.getPasswordHashAndIdByEmail(
      email,
    );
    if (!userInfo) {
      throw new CustomError('UserNotFound');
    }

    const isPasswordValid = await ArgonService.compare(
      password,
      userInfo.password_hash,
    );

    if (!isPasswordValid) {
      throw new CustomError('InvalidCredential');
    }

    const tokens = await this.getTokens(userInfo.id);

    await this.updateRefreshToken(userInfo.id, tokens.refresh_token);

    return tokens;
  }

  public async logOut(userId: number): Promise<void> {
    await this._userRepository.updateRefreshTokenById(userId, null);
  }

  public async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = await ArgonService.hash(refreshToken);
    await this._userRepository.updateRefreshTokenById(
      userId,
      hashedRefreshToken,
    );
  }

  public async getTokens(userId: number): Promise<ITokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this._jwtService.signAsync(
        {
          sub: userId,
        },
        configService.jwtAccessSignOptions(),
      ),
      this._jwtService.signAsync(
        {
          sub: userId,
        },
        configService.jwtRefreshSignOption(),
      ),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
