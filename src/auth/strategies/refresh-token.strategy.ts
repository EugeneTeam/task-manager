import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { configService } from '../../common/services/config.service';
import { Request } from 'express';
import { REFRESH_TOKEN_STRATEGY } from '../constants/strategies-names.constant';
import { Injectable } from '@nestjs/common';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  REFRESH_TOKEN_STRATEGY,
) {
  constructor() {
    super(configService.jwtRefreshTokenConfig());
  }

  public validate(req: Request, payload: IJwtPayload): IJwtPayload {
    const refreshToken: string = req.get('refreshToken');
    return { ...payload, refreshToken };
  }
}
