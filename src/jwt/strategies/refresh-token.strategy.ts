import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { configService } from '../../common/services/config.service';
import { Request } from 'express';

export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super(configService.jwtRefreshTokenConfig());
  }

  // todo add types, removed ANY
  public validate(req: Request, payload: any) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return { ...payload, refreshToken };
  }
}
