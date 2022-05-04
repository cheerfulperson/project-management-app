import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

import { numbers, statusCodes } from 'src/app/constants';
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
    private router: Router
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
        .subscribe((value: { token: string }) => {
          localStorage.setItem('isUserLoginIn', JSON.stringify(true));
          localStorage.setItem('token', value.token);
          this.router.navigateByUrl(''); // TODO: navigate to main page
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
