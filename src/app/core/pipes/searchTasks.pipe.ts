import { Pipe, PipeTransform } from '@angular/core';
import { Task } from 'src/app/project-management-app/models/task.model';

@Pipe({
  name: 'searchTasks',
})
export class SearchTasksPipe implements PipeTransform {
  public transform(tasks: Task[], searchTerm: string = ''): Task[] {
    if (!searchTerm.trim()) {
      return tasks;
    }
    return tasks?.filter((task: Task) => {
      return (
        task.order.toString().includes(searchTerm.toLowerCase()) ||
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }
}
