import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../base/base.repository";
import { PersistanceService } from '../../persistence/persistance.service';
import type { Board } from "@interfaces/boards/boards.interface";

@Injectable() 
export class BoardsRepository extends BaseRepository<Board> {
    constructor(persistanceService: PersistanceService){
        super(persistanceService, 'board')
    }
}