import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { GetAllBoardsResponseModel } from 'src/app/project-management-app/models/board.model';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent {
  @Input() public board: GetAllBoardsResponseModel = { id: '', title: '' };

  @Output() public delete: EventEmitter<string> = new EventEmitter();

  public isConfModalActive: boolean = false;

  public constructor(private apiService: ApiService) {}

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
