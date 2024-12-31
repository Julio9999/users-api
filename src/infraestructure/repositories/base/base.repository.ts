import { Injectable } from '@nestjs/common';

import { PersistanceService } from '@infraestructure/persistence/persistance.service';



@Injectable()
export class BaseRepository<T> {
  constructor(
    protected persistanceService: PersistanceService,
    private readonly model: string,
  ) {}

  async create(data: any): Promise<T> {
    return this.persistanceService[this.model].create(data);
  }

  async findAll(): Promise<T[]> {
    return this.persistanceService[this.model].findMany({where: {disabled: false}});
  }

  async findOne(id: number): Promise<T | null> {
    return this.persistanceService[this.model].findUnique({
      where: { id, disabled: false },
    });
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    return this.persistanceService[this.model].update({
      where: { id, disabled: false },
      data,
    });
  }

  async delete(id: number): Promise<T> {
    return this.persistanceService[this.model].update({
      where: { id, disabled: false },
      data: {disabled: true}
    });
  }
}