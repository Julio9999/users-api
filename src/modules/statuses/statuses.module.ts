import { Module } from '@nestjs/common';

import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { RepositoriesModule } from 'src/infraestructure/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [StatusesController],
  providers: [StatusesService],
})
export class StatusesModule {}
