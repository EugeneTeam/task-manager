import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ACCESS_TOKEN_STRATEGY } from '../constants/strategies-names.constant';

@Injectable()
export class AccessTokenGuard extends AuthGuard(ACCESS_TOKEN_STRATEGY) {}
