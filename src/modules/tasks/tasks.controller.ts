import { Controller, Get, Post, Body, Param,Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AsignUserToTaskDto, CreateTaskDto } from './dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }


  @Put('asignUser/:id')
  asignTaskToUser(
    @Body() asignUserToTaskDto: AsignUserToTaskDto,
    @Param('id') id: string
  ){
    return this.tasksService.asignTaskToUser(asignUserToTaskDto, id)
  }

}
