import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../base/base.repository";
import { Status } from "@prisma/client";
import { PersistanceService } from '../../persistence/persistance.service';

@Injectable()
export class StatusesRepository extends BaseRepository<Status> {
    constructor(persistanceService: PersistanceService){
        super(persistanceService, 'status')
    }
}