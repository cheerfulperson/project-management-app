import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectIsUserAuthorized } from 'src/app/ngrx/selectors/session.selectors';
import { IAppState } from 'src/app/ngrx/states/app.state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  public constructor(private store: Store, private router: Router) {}

  public canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      route.routeConfig?.path === 'sign-up' ||
      route.routeConfig?.path === 'login'
    ) {
      return (this.store as Store<IAppState>)
        .select(selectIsUserAuthorized)
        .pipe(map((value: boolean) => this.checkAuth(!value)));
    }
    return (this.store as Store<IAppState>)
      .select(selectIsUserAuthorized)
      .pipe(map((value: boolean) => this.checkAuth(value)));
  }

  private checkAuth(value: boolean): boolean {
    if (!value) {
      this.router.navigateByUrl('/404');
    }
    return value;
  }
}
