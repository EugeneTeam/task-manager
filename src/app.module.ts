import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersTasksModule } from './users_tasks/users_tasks.module';
import { FilesModule } from './files/files.module';
import { FilesTasksModule } from './files_tasks/files_tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './common/services/config.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    TasksModule,
    UsersTasksModule,
    FilesModule,
    FilesTasksModule,
    TypeOrmModule.forRoot(configService.getTypeORMOptions()),
    AuthModule,
  ],
})
export class AppModule {}
