import { Pipe, PipeTransform } from '@angular/core';
import { Column } from '../models/column.models';

@Pipe({
  name: 'sortByOrder',
})
export class SortByOrderPipe implements PipeTransform {
  public transform(value: Column[] | undefined): Column[] | undefined | null {
    return value?.sort((a: Column, b: Column) => a.order - b.order);
  }
}
