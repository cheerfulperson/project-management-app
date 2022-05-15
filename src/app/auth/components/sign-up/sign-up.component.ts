import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

import {
  ErrorMessages,
  numbers,
  regexp,
  StatusCodes,
  Timer,
} from 'src/app/constants';
import {
  LoginResponseModel,
  SignUpResponseModel,
  SignUpUserModel,
} from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AddUserSession } from 'src/app/ngrx/actions/session.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  public errorMessage: string = '';

  public signUpForm: FormGroup = new FormGroup({
    nameInput: new FormControl('', Validators.minLength(numbers.MinNameLength)),
    loginInput: new FormControl(
      '',
      Validators.minLength(numbers.MinLoginLength)
    ),
    passwordInput: new FormControl(
      '',
      Validators.pattern(regexp.PasswordRegExp)
    ),
  });

  public constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}

  public signUp(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const user: SignUpUserModel = {
      name: this.signUpForm.controls['nameInput'].value,
      login: this.signUpForm.controls['loginInput'].value,
      password: this.signUpForm.controls['passwordInput'].value,
    };

    this.authService
      .signUp(user)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === StatusCodes.Conflict) {
            this.showErrorMessage(ErrorMessages.Conflict);
          } else this.showErrorMessage(ErrorMessages.OtherErrors);
          throw err.error.message;
        })
      )
      .subscribe((data: SignUpResponseModel) => {
        this.authService
          .login({ login: user.login, password: user.password })
          .subscribe(({ token }: LoginResponseModel) => {
            const action: AddUserSession = new AddUserSession({
              name: data.name,
              id: data.id,
              token: token,
            });
            this.store.dispatch(action);
            this.router.navigateByUrl('');
          });
      });
  }

  private showErrorMessage(message: string): void {
    this.errorMessage = message;
    this.signUpForm.controls['loginInput'].setValue('');
    setTimeout(() => {
      this.errorMessage = '';
    }, Timer.MessageErrorView);
  }
}
