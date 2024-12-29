import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { RepositoriesModule } from 'src/infraestructure/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [BoardsController],
  providers: [
    BoardsService,
  ],
})
export class BoardsModule {}
