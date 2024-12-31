import { PersistanceModule } from '@infraestructure/persistence/persistance.module';
import { Module } from '@nestjs/common';
import { UsersRepository } from './users/users.repository';
import { TasksRepository } from './tasks/tasks.repository';
import { BoardsRepository } from './boards/boards.repository';
import { StatusesRepository } from './statuses/statuses.repository';

@Module({
  imports: [PersistanceModule],
  providers: [
    UsersRepository, 
    TasksRepository, 
    BoardsRepository, 
    StatusesRepository
  ],
  exports: [
    UsersRepository,
    TasksRepository,
    BoardsRepository, 
    StatusesRepository
  ], 
})
export class RepositoriesModule {}