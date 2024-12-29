import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base/base.repository';
import { Task } from '@prisma/client';
import { PersistanceService } from 'src/infraestructure/persistence/persistance.service';

@Injectable()
export class TasksRepository extends BaseRepository<Task> {
  constructor(persistanceService: PersistanceService) {
    super(persistanceService, 'task');
  }

  findAll() {
    return this.persistanceService.task.findMany({
      include: {
        User: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.persistanceService.task.findUnique({
      where: {
        id,
      },
      include: {
        User: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  asignTaskToUser(taskId: number, userId: number){
    return this.persistanceService.task.update({
        where: {
          id: taskId
        },
        data: {
          userId
        }
      })
  }


}
