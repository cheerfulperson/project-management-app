import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscriber, switchMap } from 'rxjs';

import { ApiService } from 'src/app/core/services/api.service';
import { DeleteUserSession } from 'src/app/ngrx/actions/session.actions';
import {
  LoginResponseModel,
  LoginUserModel,
  SignUpResponseModel,
  SignUpUserModel,
} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public constructor(
    private apiService: ApiService,
    private store: Store,
    private router: Router
  ) {}

  public login(userData: LoginUserModel): Observable<LoginResponseModel> {
    return this.apiService.login(userData);
  }

  public logout(): void {
    const action: DeleteUserSession = new DeleteUserSession();
    this.store.dispatch(action);
    this.router.navigateByUrl('/');
  }

  public signUp(userData: SignUpUserModel): Observable<SignUpResponseModel> {
    return this.apiService.signUp(userData);
  }

  public getUserData(userLogin: string): void {
    this.apiService
      .getAllUsers()
      .subscribe((elements: SignUpResponseModel[]) => {
        elements.filter((el: SignUpResponseModel) => el.login === userLogin);
      });
  }

  public getUserByLogin(
    login: string,
    token: string
  ): Observable<SignUpResponseModel> {
    return new Observable((observer: Subscriber<SignUpResponseModel>) => {
      this.apiService
        .getUsersWithToken(token)
        .pipe(
          switchMap((value: SignUpResponseModel[]) =>
            value.filter((model: SignUpResponseModel) => model.login === login)
          )
        )
        .subscribe((user: SignUpResponseModel) => {
          observer.next(user);
        });
    });
  }
}
