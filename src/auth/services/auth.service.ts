import { Inject, Injectable } from '@nestjs/common';
import { USER_REPO_PROVIDER_KEY } from '../../users/constants/providers.constants';
import { IUserRepository } from '../../users/interfaces/user-repository.interface';
import { IUser } from '../../users/interfaces/user.interface';
import { CustomError } from '../../common/errors/custom.error';
import { ArgonService } from '../../common/services/bcrypt.service';
import { ITokens } from '../interfaces/tokens.interfaces';
import { JwtService } from '@nestjs/jwt';
import { configService } from '../../common/services/config.service';

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

  public async signIn({ email, password }): Promise<ITokens> {
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

    await this.updateRefreshToken(email, tokens.refresh_token);

    return tokens;
  }

  public async logOut(userId: number): Promise<void> {
    await this._userRepository.updateRefreshTokenById(userId, null);
  }

  // todo add type
  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await ArgonService.hash(refreshToken);
    await this._userRepository.updateRefreshTokenById(
      userId,
      hashedRefreshToken,
    );
  }

  public async getTokens(userId: number): Promise<ITokens> {
    const { accessSecret, refreshSecret } = configService.jwtSecretTokens();
    // todo move config to configService
    const [accessToken, refreshToken] = await Promise.all([
      this._jwtService.signAsync(
        {
          sub: userId,
        },
        {
          secret: accessSecret,
          expiresIn: '15m',
        },
      ),
      this._jwtService.signAsync(
        {
          sub: userId,
        },
        {
          secret: refreshSecret,
          expiresIn: '7d',
        },
      ),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
