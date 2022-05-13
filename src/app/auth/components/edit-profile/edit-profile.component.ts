import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { numbers, regexp, Timer } from 'src/app/constants';
import { selectSession } from 'src/app/ngrx/selectors/session.selectors';
import { SignUpUserModel } from '../../models/user.model';
import { UserSessionData } from 'src/app/shared/models/user-session.model';
import { IAppState } from 'src/app/ngrx/states/app.state';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  public errorMessage: string = '';

  public id: string = '';

  public userName: string = '';

  public isViewPassword: boolean = false;

  public isConfirmWindowOpen: boolean = false;

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
    private store: Store,
    private authService: AuthService,
    private apiService: ApiService
  ) {
    (this.store as Store<IAppState>)
      .select(selectSession)
      .subscribe((session: UserSessionData | null) => {
        if (session) {
          this.id = session.id;
          this.userName = session.name;
        }
      });
  }

  public save(): void {
    if (this.editProfileForm.invalid) {
      this.editProfileForm.markAllAsTouched();
      return;
    }
    const userUpdatedData: SignUpUserModel = {
      name: this.editProfileForm.controls['nameInput'].value,
      login: this.editProfileForm.controls['loginInput'].value,
      password: this.editProfileForm.controls['passwordInput'].value,
    };
    this.apiService.updateUserProfile(userUpdatedData, this.id).subscribe();
  }

  public confirmDelete(): void {
    this.isConfirmWindowOpen = true;
  }

  public deleteProfile(choice: boolean): void {
    console.log(choice);
    if (choice) {
      this.apiService.deleteUserProfile(this.id);
    }
    this.isConfirmWindowOpen = false;
    this.authService.logout();
  }

  public toggleViewPassword(): void {
    this.isViewPassword = !this.isViewPassword;
  }

  private showErrorMessage(message: string): void {
    this.errorMessage = message;
    this.editProfileForm.controls['loginInput'].setValue('');
    setTimeout(() => {
      this.errorMessage = '';
    }, Timer.MessageErrorView);
  }
}
