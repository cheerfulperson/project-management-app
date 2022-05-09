import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import {
  GetAllBoardsResponseModel,
  UpdateBoardResponseModel,
} from 'src/app/project-management-app/models/board.model';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent {
  @Input() public board: GetAllBoardsResponseModel = { id: '', title: '' };

  @Output() public delete: EventEmitter<string> = new EventEmitter();

  public isConfModalActive: boolean = false;

  public isUpdateBoardFormActive: boolean = false;

  public updateBoardForm: FormGroup = new FormGroup({
    newBoardTitleInput: new FormControl('', Validators.required),
  });

  public constructor(private apiService: ApiService) {}

  public updateBoard(): void {
    if (this.updateBoardForm.valid) {
      const newTitle: string =
        this.updateBoardForm.controls['newBoardTitleInput'].value;

      this.apiService
        .updateBoard(newTitle, this.board.id)
        .subscribe((res: UpdateBoardResponseModel) => {
          this.board.title = res.title;
          this.toggleUpdateBoardForm();
        });
    }
  }

  public toggleUpdateBoardForm(): void {
    this.isUpdateBoardFormActive = !this.isUpdateBoardFormActive;
  }

  public toggleConfModal(): void {
    this.isConfModalActive = !this.isConfModalActive;
  }

  public deleteBoard(userChoise: boolean): void {
    if (!userChoise) {
      this.toggleConfModal();
      return;
    }
    this.apiService.deleteBoard(this.board.id);
    this.delete.emit(this.board.id);
    this.toggleConfModal();
  }
}
