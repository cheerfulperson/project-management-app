import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { GetAllBoardsResponseModel } from '../../models/board.model';

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

  public createBoard(): void {}
}
