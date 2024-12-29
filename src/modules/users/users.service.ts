import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hasPassword } from 'src/utils/hash-password/hash-password';
import { UsersRepository } from 'src/infraestructure/repositories/users/users.repository';

@Injectable()
export class UsersService {

  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;
    const hashedPassword = await hasPassword(password)
    await this.usersRepository.create({
      data: {
        name,
        password: hashedPassword,
        email
      }
    })
    return 'Usuario creado correctamente';
  }
  findAll() {
    return this.usersRepository.findAll();
  }

  findOne(id: number) {
    return this.usersRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto)
  }

  remove(id: number) {
    this.usersRepository.delete(id)

    return "Usuario desactivado con éxito"
  }
}
