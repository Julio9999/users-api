import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../base/base.repository";
import { Board } from "@prisma/client";
import { PersistanceService } from '../../persistence/persistance.service';

@Injectable() 
export class BoardsRepository extends BaseRepository<Board> {
    constructor(persistanceService: PersistanceService){
        super(persistanceService, 'board')
    }
}