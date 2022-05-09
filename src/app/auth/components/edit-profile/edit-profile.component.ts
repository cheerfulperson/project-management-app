import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs';
import { numbers, regexp, statusCodes } from 'src/app/constants';
import { AddUserSession } from 'src/app/ngrx/actions/session.actions';
import { LoginResponseModel, SignUpUserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  public errorMessage: string = '';

  public editProfileForm: FormGroup = new FormGroup({
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

  /*   public signUp(): void {
    if (this.editProfileForm.invalid) {
      this.editProfileForm.markAllAsTouched();
      return;
    }
    const user: SignUpUserModel = {
      name: this.editProfileForm.controls['nameInput'].value,
      login: this.editProfileForm.controls['loginInput'].value,
      password: this.editProfileForm.controls['passwordInput'].value,
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
          .subscribe(({ token }: LoginResponseModel) => {
            const action: AddUserSession = new AddUserSession({
              name: user.name,
              id: '123456',
              token: token,
            });
            this.store.dispatch(action);
            this.router.navigateByUrl('');
          });
      });
  } */

  public cancel(): void {
    this.router.navigateByUrl('');
  }

  public save(): void {
    if (this.editProfileForm.invalid) {
      this.editProfileForm.markAllAsTouched();
      return;
    }
    const user: SignUpUserModel = {
      name: this.editProfileForm.controls['nameInput'].value,
      login: this.editProfileForm.controls['loginInput'].value,
      password: this.editProfileForm.controls['passwordInput'].value,
    };
    this.authService.editProfile(user.login);
    this.router.navigateByUrl('');
  }

  public delete(): void {}

  private showErrorMessage(message: string): void {
    this.errorMessage = message;
    this.editProfileForm.controls['loginInput'].setValue('');
    setTimeout(() => {
      this.errorMessage = '';
      // eslint-disable-next-line no-magic-numbers
    }, 5000);
  }
}
