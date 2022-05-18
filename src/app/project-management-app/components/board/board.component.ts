import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
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
export class BoardComponent implements OnInit, AfterViewInit, OnDestroy {
  public board?: Board;
  public columns?: Column[];
  public isModalVisible: boolean = false;
  public isColumnChanged: boolean = true;
  public columnToDelete?: Column;
  public isLoaded: boolean = false;
  public bgNum: number = 0;

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

    const config: string | null = localStorage.getItem('boardBgConfig');
    const currBoardId: string = this.routeInfo.snapshot.params['id'];
    if (config) {
      const item: { boardId: string; bgNum: number } = JSON.parse(
        config
      ).filter(
        (el: { boardId: string; bgNum: number }) => el.boardId === currBoardId
      )[0];
      if (item) {
        this.bgNum = item.bgNum;
      }
    }
  }

  public ngAfterViewInit(): void {
    if (this.bgNum) {
      document.body.style.backgroundImage = `url(../../../../../assets/images/boardsBg/${this.bgNum}.jpg)`;
    }
  }

  public ngOnDestroy(): void {
    document.body.style.backgroundImage = 'none';
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

  public openConfirmWindow(id: string): void {
    this.columnToDelete = this.board?.columns?.find(
      (col: Column): boolean => col.id === id
    );
  }

  public deleteColumn(choice: boolean): void {
    if (!choice) {
      this.columnToDelete = undefined;
      return;
    }
    if (!this.board || !this.columnToDelete) return;
    this.apiService
      .deleteColumn(this.board.id, this.columnToDelete.id)
      .subscribe(() => {
        if (this.board && this.board?.columns) {
          this.board.columns = this.board?.columns?.filter(
            (col: Column): boolean => col.id !== this.columnToDelete?.id
          );
          this.columnToDelete = undefined;
        }
      });
  }

  private getBoardInfo(id: string): void {
    this.apiService.getBoard(id).subscribe((board: Board) => {
      this.isLoaded = true;
      this.board = board;
    });
  }
}
