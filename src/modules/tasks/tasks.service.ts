import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { AsignUserToTaskDto } from './dto';
import { TasksRepository } from '@infraestructure/repositories/tasks/tasks.repository';

@Injectable()
export class TasksService {

  constructor(private readonly tasksRepository: TasksRepository){}

  async create(createTaskDto: CreateTaskDto) {

    const {name} = createTaskDto;

    const res = await this.tasksRepository.create({
      data: {
        name
      }
    })

    return 'Tarea creada exitosamente';
  }

  findAll() {
    return this.tasksRepository.findAll();
  }

  async findOne(id: number) {
    const res = await this.tasksRepository.findOne(id);

    if (res == null) throw new NotFoundException('Usuario no encontrado')
    return res;
  }

  async asignTaskToUser(asignUserToTaskDto: AsignUserToTaskDto, id: string){
    const { userId } = asignUserToTaskDto;

    const res = await this.tasksRepository.asignTaskToUser(+id, userId);

    return 'Tarea asignada correctamente';
  }
}
