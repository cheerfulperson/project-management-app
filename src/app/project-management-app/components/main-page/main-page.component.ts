import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import {
  CreateBoardResponseModel,
  GetAllBoardsResponseModel,
} from '../../models/board.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public boards: GetAllBoardsResponseModel[] = [];

  public createBoardForm: FormGroup = new FormGroup({
    boardTitleInput: new FormControl('', Validators.required),
  });

  public isFormActive: boolean = false;

  public constructor(private apiService: ApiService) {}

  public ngOnInit(): void {
    this.apiService
      .getAllBoards()
      .subscribe((boards: GetAllBoardsResponseModel[]) => {
        this.boards = boards;
      });
  }

  public toggleForm(): void {
    const titleInput: AbstractControl =
      this.createBoardForm.controls['boardTitleInput'];

    titleInput.setValue('');
    titleInput.markAsUntouched();

    this.isFormActive = !this.isFormActive;
  }

  public deleteBoard(boardId: string): void {
    this.boards = this.boards.filter(
      (el: GetAllBoardsResponseModel) => el.id !== boardId
    );
  }

  public createBoard(): void {
    if (this.createBoardForm.valid) {
      this.apiService
        .createBoard(this.createBoardForm.controls['boardTitleInput'].value)
        .subscribe((value: CreateBoardResponseModel) => {
          this.boards.push(value);
          this.toggleForm();
        });
    }
  }
}
