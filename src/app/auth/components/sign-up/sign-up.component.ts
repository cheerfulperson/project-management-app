import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  public signUpForm: FormGroup = new FormGroup({
    nameInput: new FormControl(),
    loginInput: new FormControl(),
    passwordInput: new FormControl(),
  });
}
