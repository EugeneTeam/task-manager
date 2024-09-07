import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { configService } from '../../common/services/config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super(configService.jwtAccessTokenConfig());
  }

  // todo raw
  public validate(payload) {
    return payload;
  }
}
