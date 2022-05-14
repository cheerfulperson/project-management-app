import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs';

import { ErrorMessages, numbers, StatusCodes, Timer } from 'src/app/constants';
import { AddUserSession } from 'src/app/ngrx/actions/session.actions';
import {
  LoginResponseModel,
  SignUpResponseModel,
} from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public errorMessage: string = '';

  public loginForm: FormGroup = new FormGroup({
    loginInput: new FormControl(
      '',
      Validators.minLength(numbers.MinLoginLength)
    ),
    passwordInput: new FormControl(''),
  });

  public constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  public login(): void {
    if (this.loginForm.valid) {
      this.authService
        .login({
          login: this.loginForm.controls['loginInput'].value,
          password: this.loginForm.controls['passwordInput'].value,
        })
        .pipe(
          catchError((err: HttpErrorResponse) => {
            if (err.status === StatusCodes.Forbiden) {
              this.showErrorMessage(ErrorMessages.Forbiden);
            } else this.showErrorMessage(ErrorMessages.OtherErrors);
            throw err.error.message;
          })
        )
        .subscribe(({ token }: LoginResponseModel) =>
          this.createUserSession(token)
        );
    }
  }

  private createUserSession(token: string): void {
    this.authService
      .getUserByLogin(this.loginForm.controls['loginInput'].value, token)
      .subscribe((data: SignUpResponseModel) => {
        const action: AddUserSession = new AddUserSession({
          name: data.name,
          id: data.id,
          token: token,
        });
        this.store.dispatch(action);
        this.router.navigateByUrl('');
      });
  }

  private showErrorMessage(message: string): void {
    this.errorMessage = message;
    this.loginForm.controls['loginInput'].setValue('');
    setTimeout(() => {
      this.errorMessage = '';
    }, Timer.MessageErrorView);
  }
}
