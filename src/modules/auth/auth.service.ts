import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { UserPayload } from './interfaces/user-payload';
import { comparePassword } from 'src/utils/hash-password/hash-password';
import { UsersRepository } from 'src/infraestructure/repositories/users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    passwordToValidate: string,
  ): Promise<UserPayload> {
    const user = await this.usersRepository.findByEmail(email);

    const { password } = user;

    if (!password) throw new NotFoundException('Usuario inexistente');

    if (password) {
      const isValid = await comparePassword(passwordToValidate, password);

      if (isValid) {
        return user;
      } else {
        throw new UnauthorizedException('Credenciales inválidas');
      }
    }
  }

  async login(user: UserPayload) {
    const payload = { name: user.name, id: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: 'my-secret',
        expiresIn: '1h'
      }),
    };
  }
}
