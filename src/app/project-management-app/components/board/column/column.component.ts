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
import { MoveTaskService } from 'src/app/project-management-app/services/move-task.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  providers: [MoveTaskService],
})
export class ColumnComponent implements OnInit {
  @Input() public board?: Board;
  @Input() public columnInfo?: Column;
  @Input() public tasks?: Task[];
  @Output() public deleteCol: EventEmitter<string> = new EventEmitter<string>();

  public isActiveTitle: boolean = false;
  public isModalVisible: boolean = false;
  public columnTitle: string = '';
  public taskToDelete?: Task;
  public selectedTask?: Task;

  public constructor(
    private apiService: ApiService,
    private moveTaskService: MoveTaskService
  ) {}

  public ngOnInit(): void {
    this.columnTitle = this.columnInfo?.title || '';
  }

  public dropTask(event: CdkDragDrop<Task[]>): void {
    const {
      container,
      previousContainer,
      previousIndex,
      currentIndex,
    }: CdkDragDrop<Task[]> = event;
    if (!this.columnInfo) return;

    this.moveTaskService.board = this.board;
    if (event.previousContainer === event.container) {
      this.moveTaskService.moveTasksIntoColumn(
        this.columnInfo,
        previousIndex,
        currentIndex
      );
      moveItemInArray(container.data, previousIndex, currentIndex);
    } else {
      this.moveTaskService.moveTasksBetweenColumns(
        this.columnInfo,
        previousContainer.data[previousIndex],
        previousIndex,
        currentIndex
      );
      transferArrayItem(
        previousContainer.data,
        container.data,
        previousIndex,
        currentIndex
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

  public selectTask(task: Task): void {
    this.isModalVisible = true;
    this.selectedTask = task;
  }

  public changeTask(task: Task): void {
    this.tasks = this.tasks?.map((value: Task) =>
      task.id === value.id ? { ...value, ...task } : value
    );
    this.closeModal();
  }

  public createTask(task: Column | Task): void {
    this.columnInfo?.tasks?.push(<Task>task);
    this.isModalVisible = false;
  }

  public deleteTask(choice: boolean): void {
    const id: string = this.taskToDelete?.id || '';
    this.taskToDelete = undefined;

    if (!choice || !this.board || !this.columnInfo) {
      return;
    }

    this.apiService
      .deleteTask(this.board.id, this.columnInfo.id, id)
      .subscribe(() => {
        this.tasks = this.tasks?.filter(
          (task: Task): boolean => task.id !== id
        );
        if (this.columnInfo) {
          this.columnInfo.tasks = this.tasks;
        }
      });
  }

  public openConfirmWin(id: string): void {
    this.taskToDelete = this.tasks?.find(
      (task: Task): boolean => task.id === id
    );
  }

  public closeModal(): void {
    this.isModalVisible = false;
    this.selectedTask = undefined;
  }

  public deleteColumn(): void {
    this.deleteCol.emit(this.columnInfo?.id);
  }
}
