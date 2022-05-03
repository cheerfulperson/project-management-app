import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    req = req.clone({
      headers: new HttpHeaders({
        accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });

    if (req.url.endsWith('/signin')) {
      req = req.clone({
        url: `${environment.basicUrl}/signin`,
      });
    }

    if (req.url.endsWith('/signup')) {
      req = req.clone({
        url: `${environment.basicUrl}/signup`,
      });
    }

    return next.handle(req);
  }
}
