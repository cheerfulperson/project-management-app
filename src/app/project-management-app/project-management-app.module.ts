import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectManagementAppRoutingModule } from './project-management-app-routing.module';
import { ColumnComponent } from './components/board/column/column.component';
import { ResizeHeightDirective } from './directives/resize-height.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [BoardComponent, ColumnComponent, ResizeHeightDirective],
  imports: [
    CommonModule,
    SharedModule,
    ProjectManagementAppRoutingModule,
    DragDropModule,
  ],
})
export class ProjectManagementAppModule {}
