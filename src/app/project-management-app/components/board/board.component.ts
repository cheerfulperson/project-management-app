import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.models';
import { WaitlistService } from '../../services/waitlist.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  providers: [WaitlistService],
})
export class BoardComponent implements OnInit {
  public board?: Board;
  public columns?: Column[];
  public isModalVisible: boolean = false;
  public isColumnChanged: boolean = true;

  public constructor(
    private routeInfo: ActivatedRoute,
    private apiService: ApiService,
    private waitListService: WaitlistService
  ) {}

  public ngOnInit(): void {
    this.routeInfo.params.subscribe((params: Params) => {
      this.getBoardInfo(params['id']);
    });
    this.waitListService.setBoard(this.board);
  }

  public dropColumn(event: CdkDragDrop<Column[]>): void {
    if (this.board?.columns) {
      this.waitListService.setBoard(this.board);
      this.waitListService.fillWaitList(
        this.board.columns,
        event.previousIndex,
        event.currentIndex
      );

      moveItemInArray(
        this.board.columns,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  public triggerModal(value: boolean): void {
    this.isModalVisible = value;
  }

  public createColumn(column: Column): void {
    if (!this.board) return;

    if (!this.board.columns) {
      this.board.columns = [];
    }

    column.tasks = [];
    this.board.columns.push(column);
    this.board.columns = this.board.columns.sort(
      (a: Column, b: Column) => a.order - b.order
    );

    this.triggerModal(false);
  }

  public deleteColumn(id: string): void {
    if (!this.board) return;
    this.apiService.deleteColumn(this.board.id, id).subscribe(() => {
      if (this.board && this.board?.columns) {
        this.board.columns = this.board?.columns?.filter(
          (col: Column): boolean => col.id !== id
        );
      }
    });
  }

  private getBoardInfo(id: string): void {
    this.apiService.getBoard(id).subscribe((board: Board) => {
      console.log(board);
      this.board = board;
    });
  }
}
