import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs';

import { numbers, statusCodes } from 'src/app/constants';
import { AddUserSession } from 'src/app/ngrx/actions/session.actions';
import { LoginResponseModel } from '../../models/user.model';
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
            if (err.status === statusCodes.Forbiden) {
              this.showErrorMessage(err.error.message);
            } else this.showErrorMessage('Server error');
            throw err.error.message;
          })
        )
        .subscribe(({ token }: LoginResponseModel) => {
          const action: AddUserSession = new AddUserSession({
            name: 'Name',
            id: '123456',
            token: token,
          });
          console.log(token);
          this.store.dispatch(action);
          this.router.navigateByUrl('');
        });
    }
  }

  private showErrorMessage(message: string): void {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
      // eslint-disable-next-line no-magic-numbers
    }, 5000);
  }
}
