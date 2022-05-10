import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Board } from 'src/app/project-management-app/models/board.model';
import { Column } from 'src/app/project-management-app/models/column.models';
import { Task } from 'src/app/project-management-app/models/task.model';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() public board?: Board;
  @Input() public columnInfo?: Column;
  @Input() public tasks?: Task[] = [];
  @Output() public deleteCol: EventEmitter<string> = new EventEmitter<string>();

  public isActiveTitle: boolean = false;
  public isModalVisible: boolean = false;
  public columnTitle: string = '';

  public constructor(private apiService: ApiService) {}

  public ngOnInit(): void {
    this.columnTitle = this.columnInfo?.title || '';
  }

  public dropTask(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  public changeTitle(isComfirmed: boolean): void {
    this.isActiveTitle = false;

    if (isComfirmed && this.columnInfo && this.board) {
      this.columnInfo.title = this.columnTitle;
      this.apiService
        .updateColumn(this.board.id, this.columnInfo.id, {
          title: this.columnTitle,
          order: this.columnInfo.order,
        })
        .subscribe();
    }
    this.columnTitle = this.columnInfo?.title || '';
  }

  public createTask(task: Column | Task): void {
    this.columnInfo?.tasks?.push(<Task>task);
  }

  public deleteTask(id: string): void {
    this.tasks = this.tasks?.filter((task: Task): boolean => task.id !== id);
  }

  public deleteColumn(): void {
    this.deleteCol.emit(this.columnInfo?.id);
  }
}
