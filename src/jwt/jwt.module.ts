import { Module } from '@nestjs/common';
import { JwtModule as JwtOriginalModule } from '@nestjs/jwt';

@Module({
  // todo maybe need add options
  imports: [JwtOriginalModule.register({})],
})
export class JwtModule {}
