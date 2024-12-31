import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PersistanceService } from '@infraestructure/persistence/persistance.service';
import { RepositoriesModule } from '@infraestructure/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    PersistanceService,
  ],
})
export class UsersModule {}
