import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersTasksModule } from './users_tasks/users_tasks.module';
import { FilesModule } from './files/files.module';
import { FilesTasksModule } from './files_tasks/files_tasks.module';

@Module({
  imports: [UsersModule, TasksModule, UsersTasksModule, FilesModule, FilesTasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
