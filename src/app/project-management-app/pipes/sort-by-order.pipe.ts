import { Pipe, PipeTransform } from '@angular/core';
import { Column } from '../models/column.models';
import { Task } from '../models/task.model';

@Pipe({
  name: 'sortByOrder',
})
export class SortByOrderPipe implements PipeTransform {
  public transform(
    value: Column[] | Task[] | undefined
  ): Column[] | Task[] | undefined {
    return value?.sort((a: Column, b: Column) => a.order - b.order);
  }
}
