import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Column } from 'src/app/project-management-app/models/column.models';
import { Task } from 'src/app/project-management-app/models/task.model';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() public columnInfo?: Column;
  @Input() public tasks?: Task[] = [];
  @Output() public deleteCol: EventEmitter<string> = new EventEmitter<string>();

  public isActiveTitle: boolean = false;
  public columnTitle: string = '';

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

    if (isComfirmed && this.columnInfo) {
      console.log(this.columnInfo.title);
      this.columnInfo.title = this.columnTitle;
    }
    this.columnTitle = this.columnInfo?.title || '';
  }

  public deleteTask(id: string): void {
    this.tasks = this.tasks?.filter((task: Task): boolean => task.id !== id);
  }

  public deleteColumn(): void {
    this.deleteCol.emit(this.columnInfo?.id);
  }
}
