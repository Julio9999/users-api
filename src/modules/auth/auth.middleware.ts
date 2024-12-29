import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './interfaces/user-payload';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: any, res: Response, next: NextFunction) {
    const token = req.cookies['access_token'];

    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      const decoded = this.jwtService.verify(token, {secret:'my-secret'}) as UserPayload;
      req.user = decoded;
      next();
    } catch (err) {
      throw new UnauthorizedException('Credenciales invalidas');
    }
  }
}
