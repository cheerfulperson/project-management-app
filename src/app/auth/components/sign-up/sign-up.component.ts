import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

import { numbers, regexp, statusCodes } from 'src/app/constants';
import { SignUpUserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

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
    private router: Router
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
      .signUp({
        name: user.name,
        login: user.login,
        password: user.password,
      })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === statusCodes.Conflict) {
            this.showErrorMessage(err.error.message);
          } else this.showErrorMessage('Server error');
          throw err.error.message;
        })
      )
      .subscribe(() => {
        this.authService
          .login({ login: user.login, password: user.password })
          .subscribe((loginValue: { token: string }) => {
            localStorage.setItem('isUserLoginIn', JSON.stringify(true));
            localStorage.setItem('token', loginValue.token);
            this.router.navigateByUrl(''); // TODO: navigate to main page
          });
      });
  }

  private showErrorMessage(message: string): void {
    this.errorMessage = message;
    this.signUpForm.controls['loginInput'].setValue('');
    setTimeout(() => {
      this.errorMessage = '';
      // eslint-disable-next-line no-magic-numbers
    }, 5000);
  }
}
