import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { configService } from '../../common/services/config.service';
import { Injectable } from '@nestjs/common';
import { ACCESS_TOKEN_STRATEGY } from '../constants/strategies-names.constant';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  ACCESS_TOKEN_STRATEGY,
) {
  constructor() {
    super(configService.jwtAccessTokenConfig());
  }

  // todo add type
  public async validate(payload) {
    return payload;
  }
}
