import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { REFRESH_TOKEN_STRATEGY } from '../constants/strategies-names.constant';

@Injectable()
export class RefreshTokenGuard extends AuthGuard(REFRESH_TOKEN_STRATEGY) {}
