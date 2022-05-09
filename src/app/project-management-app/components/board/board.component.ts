import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public board?: Board;
  public columns?: Column[] = [];
  public isModalVisible: boolean = false;

  public constructor(
    private routeInfo: ActivatedRoute,
    private apiService: ApiService
  ) {}

  public ngOnInit(): void {
    this.routeInfo.params.subscribe((params: Params) => {
      this.getBoardInfo(params['id']);
    });

    // this.apiService.getBoards().subscribe((data: Board[]) => {
    //   console.log(data);
    // });
  }

  public dropColumn(event: CdkDragDrop<Column[]>): void {
    if (this.columns) {
      moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    }
  }

  public triggerModal(value: boolean): void {
    this.isModalVisible = value;
  }

  public deleteColumn(id: string): void {
    this.columns = this.columns?.filter(
      (col: Column): boolean => col.id !== id
    );
  }

  private getBoardInfo(id: string): void {
    this.apiService.getBoard(id).subscribe((board: Board) => {
      console.log(board);
      this.board = board;
      this.columns = this.board?.columns;
    });
  }
}
