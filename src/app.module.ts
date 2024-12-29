import { MiddlewareConsumer, Module } from '@nestjs/common';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorInterceptor } from './global/interceptors/error-interceptor/error.interceptor';
import { UsersModule } from './modules/users/users.module';
import { BoardsModule } from './modules/boards/boards.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { StatusesModule } from './modules/statuses/statuses.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthMiddleware } from './modules/auth/auth.middleware';


@Module({
  imports: [
    UsersModule, 
    BoardsModule,
    TasksModule, 
    StatusesModule, 
    AuthModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware) 
      .exclude('auth/login', 'auth/logout')  
      .forRoutes('*'); 
  }
}
