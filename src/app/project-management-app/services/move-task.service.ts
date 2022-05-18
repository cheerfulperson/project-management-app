import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Board } from '../models/board.model';
import { Column } from '../models/column.models';
import { Task, UpdateTaskDto } from '../models/task.model';

@Injectable()
export class MoveTaskService {
  public board?: Board;
  public constructor(private apiService: ApiService) {}

  public moveTasksBetweenColumns(
    container: Column,
    taskInOldColomn: Task,
    fromIndex: number,
    toIndex: number
  ): void {
    const oldContainer: Column | undefined = this.getColumnByTaskId(
      taskInOldColomn.id
    );
    if (!this.board || !oldContainer) return;
    const lastOrder: number = (container.tasks?.length || 0) + 1;

    this.apiService
      .createTask(this.board.id, container.id, {
        title: taskInOldColomn.title,
        order: lastOrder,
        description: taskInOldColomn.description,
        priority: taskInOldColomn.priority,
        userId: taskInOldColomn.userId,
      })
      .subscribe((task: Task) => {
        container.tasks = container.tasks?.map((oldTask: Task) =>
          oldTask.id === taskInOldColomn.id ? task : oldTask
        );
        if (this.board) {
          this.apiService
            .deleteTask(this.board.id, oldContainer.id, taskInOldColomn.id)
            .subscribe();
        }
        this.moveTasksIntoColumn(container, lastOrder - 1, toIndex);
      });

    this.moveTasksIntoColumn(
      oldContainer,
      fromIndex,
      (oldContainer.tasks?.length || 1) - 1
    );
  }

  public moveTasksIntoColumn(
    container: Column,
    fromIndex: number,
    toIndex: number
  ): void {
    const array: Task[] = container.tasks || [];

    const move = (i: number): void => {
      if (!array[fromIndex] || !array[i]) return;

      this.updateTasksIntoColumn(
        container,
        { ...array[fromIndex] },
        { ...array[i] }
      );
      const lastOrder: number = array[fromIndex].order;
      array[fromIndex].order = array[i].order;
      array[i].order = lastOrder;
    };
    if (fromIndex > toIndex) {
      for (let i: number = fromIndex; i > toIndex; i--) {
        move(i - 1);
      }
    } else {
      for (let i: number = fromIndex; i < toIndex; i++) {
        move(i + 1);
      }
    }
  }

  private getColumnByTaskId(taskId: string): Column | undefined {
    if (!this.board || !this.board.columns) return;
    return this.board.columns.filter((column: Column | undefined) => {
      return Boolean(
        column?.tasks?.filter((task: Task) => task.id === taskId)[0]
      );
    })[0];
  }

  private updateTasksIntoColumn(
    fromContainer: Column,
    taskFrom: Task,
    taskTo: Task
  ): void {
    if (!this.board) return;
    this.apiService
      .updateTask(
        this.board.id,
        fromContainer.id,
        taskFrom.id,
        this.getUpdateTaskDto(
          taskFrom,
          this.board,
          fromContainer.id,
          taskTo.order
        )
      )
      .subscribe();
    this.apiService
      .updateTask(
        this.board.id,
        fromContainer.id,
        taskTo.id,
        this.getUpdateTaskDto(
          taskTo,
          this.board,
          fromContainer.id,
          taskFrom.order
        )
      )
      .subscribe();
  }

  private getUpdateTaskDto(
    task: Task,
    board: Board,
    columnId: string,
    newOrder: number
  ): UpdateTaskDto {
    return {
      order: newOrder,
      title: task.title,
      description: task.description,
      priority: task.priority,
      userId: task.userId,
      columnId: columnId,
      boardId: board.id,
    };
  }
}
