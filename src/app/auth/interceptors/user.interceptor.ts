import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const newReq: HttpRequest<unknown> = req.clone({
      headers: new HttpHeaders({
        accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
    return next.handle(newReq);
  }
}
