import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { catchError, Observable, timeout, TimeoutError } from 'rxjs';

@Injectable()
export class MyTimeoutInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    // const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      timeout(5000),

      catchError((err) => {
        if (err instanceof TimeoutError) {
          throw new RequestTimeoutException();
        } else {
          throw new Error(err);
        }
      }),
    );
  }
}
