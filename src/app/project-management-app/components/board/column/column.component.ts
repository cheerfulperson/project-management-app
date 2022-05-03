import { Component, Input } from '@angular/core';
import { Column } from 'src/app/project-management-app/models/column.models';
import { Task } from 'src/app/project-management-app/models/task.model';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() public culumnInfo?: Column;
  @Input() public tasks: Task[] = [];
}
