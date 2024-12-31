import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { RepositoriesModule } from '@infraestructure/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [TasksController],
  providers: [
    TasksService,
  ],
})
export class TasksModule {}
