import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UsersController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { userRepositoryProvider } from './providers/user-repository.provider';
import { AuthModule } from '../auth/auth.module';

@Module({
  // todo config entity
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  providers: [UserService, UserRepository, userRepositoryProvider],
  controllers: [UsersController],
  exports: [UserService],
})
export class UsersModule {}
