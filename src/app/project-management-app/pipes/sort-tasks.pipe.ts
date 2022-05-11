import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'sortTasks',
})
export class SortTasksPipe implements PipeTransform {
  public transform(value: Task[] | undefined): Task[] | undefined | null {
    return value?.sort((a: Task, b: Task) => a.order - b.order);
  }
}
