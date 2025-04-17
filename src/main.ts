import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { RolesGuard } from './global/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.DATABASE_URL)
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({origin: true, credentials: true});
  app.use(cookieParser());
  app.useGlobalGuards(new RolesGuard(new Reflector()));
  await app.listen(process.env.PORT ?? 3001, () => {
    console.log(`Aplication running on port 3001`)
  });
}
bootstrap();
