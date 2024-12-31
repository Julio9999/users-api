import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import { RepositoriesModule } from '@infraestructure/repositories/repositories.module';

@Module({
  imports: [JwtModule, RepositoriesModule],
  providers: [AuthService, AuthMiddleware],
  controllers: [AuthController],
  exports: [JwtModule]
})
export class AuthModule {}