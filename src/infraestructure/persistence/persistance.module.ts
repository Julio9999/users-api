import { Module } from '@nestjs/common';
import { PersistanceService } from '@infraestructure/persistence/persistance.service';

@Module({
  providers: [PersistanceService],
  exports: [PersistanceService], 
})
export class PersistanceModule {}