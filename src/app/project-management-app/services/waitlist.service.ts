import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Board } from '../models/board.model';
import { Column, FunctionColumnParams } from '../models/column.models';

@Injectable()
export class WaitlistService {
  public waitList: FunctionColumnParams[] = [];
  public isColumnChanged: boolean = true;
  public board?: Board;
  public columns?: Column[];

  public constructor(private apiService: ApiService) {}

  public setBoard(board?: Board): void {
    this.board = board;
    this.columns = this.board?.columns;
  }

  public fillWaitList(
    array: Column[],
    previousIndex: number,
    currentIndex: number
  ): void {
    const addToWaithList = (i: number): void => {
      this.waitList.unshift({
        columnFrom: { ...array[previousIndex] },
        columnTo: { ...array[i] },
      });
      const lastOrder: number = array[previousIndex].order;
      array[previousIndex].order = array[i].order;
      array[i].order = lastOrder;
    };

    if (previousIndex > currentIndex) {
      for (let i: number = previousIndex; i > currentIndex; i--) {
        addToWaithList(i - 1);
      }
    } else {
      for (let i: number = previousIndex; i < currentIndex; i++) {
        addToWaithList(i + 1);
      }
    }
    this.checkWaitList();
  }

  private changeColumn(newColumn: Column): void {
    if (!this.board) return;

    if (!newColumn.tasks) {
      newColumn.tasks = [];
    }

    this.columns = this.board.columns?.map((column: Column) => {
      return column.id === newColumn.id ? { ...newColumn, ...column } : column;
    });
  }

  private changeOrder(from: Column, to: Column): void {
    if (this.board?.columns && this.isColumnChanged) {
      this.isColumnChanged = false;
      this.apiService
        .updateColumn(this.board.id, from.id, {
          title: from.title,
          order: -1,
        })
        .subscribe(() => {
          if (this.board?.columns) {
            this.apiService
              .updateColumn(this.board.id, to.id, {
                title: to.title,
                order: from.order,
              })
              .subscribe((changedColumn: Column) => {
                if (this.board?.columns) {
                  this.changeColumn(changedColumn);
                  this.apiService
                    .updateColumn(this.board.id, from.id, {
                      title: from.title,
                      order: to.order,
                    })
                    .subscribe((column: Column) => {
                      this.isColumnChanged = true;

                      this.changeColumn(column);
                      this.checkWaitList();

                      if (this.waitList.length === 0 && this.board) {
                        this.board.columns = this.columns;
                      }
                    });
                }
              });
          }
        });
    }
  }

  private checkWaitList(): void {
    const lastIndex: number = this.waitList.length - 1;

    if (this.waitList.length !== 0) {
      this.changeOrder(
        this.waitList[lastIndex].columnFrom,
        this.waitList[lastIndex].columnTo
      );
    }
    this.waitList.pop();
  }
}
