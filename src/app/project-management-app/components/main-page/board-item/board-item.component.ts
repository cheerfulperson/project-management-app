import { Component, Input } from '@angular/core';
import { GetAllBoardsResponseModel } from 'src/app/project-management-app/models/board.model';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent {
  @Input() public board: GetAllBoardsResponseModel = { id: '', title: '' };

  public isConfModalActive: boolean = false;

  public toggleConfModal(): void {
    this.isConfModalActive = !this.isConfModalActive;
  }

  public deleteBoard(userChoise: boolean): void {
    if (!userChoise) {
      this.toggleConfModal();
      return;
    }
    console.log('deleted');
    this.toggleConfModal();
  }
}
