import { BadRequestException, CallHandler, ExecutionContext, HttpException, Injectable, InternalServerErrorException, NestInterceptor } from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
    .handle()
    .pipe(
      catchError(err => {
        console.log(err)
        if (err instanceof HttpException) {
          return throwError(() => err);
        }
        
        if(err.code == "P2002"){
          
          const target = err.meta.target[0];
          
          return throwError(() => new BadRequestException(`El ${target} ingresado ya está en uso`))
        }

        return throwError(() => new InternalServerErrorException('Ocurrio un error inesperado'))
      })
    )
    ;
  }
}
