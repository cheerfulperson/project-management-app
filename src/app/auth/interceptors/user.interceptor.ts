import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { selectSession } from 'src/app/ngrx/selectors/session.selectors';
import { IAppState } from 'src/app/ngrx/states/app.state';
import { UserSessionData } from 'src/app/shared/models/user-session.model';

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  public token: string | null = null;

  public constructor(private store: Store) {
    (this.store as Store<IAppState>)
      .select(selectSession)
      .subscribe((session: UserSessionData | null) => {
        if (session) {
          this.token = session.token;
        } else {
          this.token = null;
        }
      });
  }

  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const url: string = req.url[0] === '/' ? req.url : `/${req.url}`;
    if (url.includes('i18n')) return next.handle(req);

    const reqInfo: HttpRequest<unknown> = req.clone({
      url: `${environment.basicUrl}${url}`,
    });

    return next.handle(this.addAuthToken(reqInfo));
  }

  public addAuthToken(request: HttpRequest<unknown>): HttpRequest<unknown> {
    if (!this.token) return request;

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}
