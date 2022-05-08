import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BoardsGetResponse } from '../../models/board.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  public boards: BoardsGetResponse[] = [
    //! mocks data
    { id: '123', title: 'super mega project0' },
    { id: '123', title: 'super mega project1' },
    { id: '123', title: 'super mega project2' },
    { id: '123', title: 'super mega project3' },
    { id: '123', title: 'super mega project4' },
    { id: '123', title: 'super mega project5' },
    { id: '123', title: 'super mega project6' },
    { id: '123', title: 'super mega project6' },
    { id: '123', title: 'super mega project6' },
    { id: '123', title: 'super mega project6' },
    { id: '123', title: 'super mega project6' },
    { id: '123', title: 'super mega project6' },
    { id: '123', title: 'super mega project6' },
    { id: '123', title: 'super mega project6' },
    { id: '123', title: 'super mega project6' },
    { id: '123', title: 'super mega project6' },
    { id: '123', title: 'super mega project6' },
    { id: '123', title: 'super mega project6' },
    { id: '123', title: 'super mega project6' },
    { id: '123', title: 'super mega project6' },
    { id: '123', title: 'super mega project6' },
  ];

  public createBoardForm: FormGroup = new FormGroup({
    boardTitleInput: new FormControl('', Validators.required),
  });

  public isFormActive: boolean = false;

  public toggleForm(): void {
    const titleInput: AbstractControl =
      this.createBoardForm.controls['boardTitleInput'];

    titleInput.setValue('');
    titleInput.markAsUntouched();

    this.isFormActive = !this.isFormActive;
  }

  public createBoard(): void {
    this.toggleForm();
  }
}
