import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { StatusesRepository } from 'src/infraestructure/repositories/statuses/statuses.repository';

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
    return 'Status creado correctamente';
  }

  findAll() {
    return this.statusesRepository.findAll();
  }

  findOne(id: number) {
    return this.statusesRepository.findOne(id);
  }

  update(id: number, updateStatusDto: UpdateStatusDto) {
    return `This action updates a #${id} status`;
  }

  remove(id: number) {
    return `This action removes a #${id} status`;
  }
}
