import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { configService } from '../../common/services/config.service';
import { Injectable } from '@nestjs/common';
import { ACCESS_TOKEN_STRATEGY } from '../constants/strategies-names.constant';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  ACCESS_TOKEN_STRATEGY,
) {
  constructor() {
    super(configService.jwtAccessTokenConfig());
  }

  public validate(payload: IJwtPayload): IJwtPayload {
    return payload;
  }
}
