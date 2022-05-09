import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  public isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted: boolean | null = form && form.submitted;
    return Boolean(
      control &&
        control.invalid &&
        (control.dirty || control.touched || isSubmitted)
    );
  }
}
