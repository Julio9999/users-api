import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base/base.repository';
import { PersistanceService } from '../../persistence/persistance.service';
import { Status } from '@interfaces/statuses/statuses.interface';

@Injectable()
export class StatusesRepository extends BaseRepository<Status> {
  constructor(persistanceService: PersistanceService) {
    super(persistanceService, 'status');
  }



  findAll(): Promise<Status[]> {
    return this.persistanceService.status.findMany();
  }
}
