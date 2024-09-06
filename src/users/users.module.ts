import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UsersController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  // todo config entity
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserRepository],
  controllers: [UsersController],
  exports: [UserService],
})
export class UsersModule {}
