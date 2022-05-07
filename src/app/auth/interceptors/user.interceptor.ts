import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const url: string = req.url[0] === '/' ? req.url : `/${req.url}`;
    if (url.includes('i18n')) return next.handle(req);

    const reqInfo: HttpRequest<unknown> = req.clone({
      url: `${environment.basicUrl}${url}`,
    });

    return next.handle(reqInfo);
  }
}
