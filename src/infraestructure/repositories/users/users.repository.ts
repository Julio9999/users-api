import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { BaseRepository } from '../base/base.repository';
import { PersistanceService } from 'src/infraestructure/persistence/persistance.service';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor(persistanceService: PersistanceService) {
    super(persistanceService, 'user'); 
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.persistanceService.user.findUnique({
      where: { email, disabled: false },
    });
  }

  async findMany (): Promise<User[]> {
    return this.persistanceService.user.findMany({})
  }
}