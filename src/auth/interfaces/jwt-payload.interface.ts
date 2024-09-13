export interface IJwtPayload {
  sub: number;
  iat: number;
  exp: number;
  refreshToken?: string;
}
