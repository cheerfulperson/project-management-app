import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectManagementAppRoutingModule } from './project-management-app-routing.module';
import { ColumnComponent } from './components/board/column/column.component';

@NgModule({
  declarations: [BoardComponent, ColumnComponent],
  imports: [CommonModule, SharedModule, ProjectManagementAppRoutingModule],
})
export class ProjectManagementAppModule {}
