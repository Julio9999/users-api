import { Injectable } from '@nestjs/common';

import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { StatusesRepository } from '@infraestructure/repositories/statuses/statuses.repository';

import type { Status } from '@interfaces/statuses/statuses.interface';

@Injectable()
export class StatusesService {
  constructor(private readonly statusesRepository: StatusesRepository) {}

  async create(createStatusDto: CreateStatusDto) {
    const { name } = createStatusDto;

    await this.statusesRepository.create({
      data: {
        name,
      },
    });
    return {message: "Status creado correctamente"};
  }

  findAll(): Promise<Status[]> {
    return this.statusesRepository.findAll();
  }

  findOne(id: number) {
    return this.statusesRepository.findOne(id);
  }

  async update(id: number, updateStatusDto: UpdateStatusDto) {
    await this.statusesRepository.update(id, updateStatusDto);
    return {message: "Status actualizado correctamente"};
  }

  remove(id: number) {
    return this.statusesRepository.delete(id);
  }
}
