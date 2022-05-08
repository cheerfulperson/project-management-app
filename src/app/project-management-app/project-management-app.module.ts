import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectManagementAppRoutingModule } from './project-management-app-routing.module';
import { ColumnComponent } from './components/board/column/column.component';
import { ResizeHeightDirective } from './directives/resize-height.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { BoardItemComponent } from './components/main-page/board-item/board-item.component';
@NgModule({
  declarations: [
    BoardComponent,
    ColumnComponent,
    ResizeHeightDirective,
    PageNotFoundComponent,
    HomepageComponent,
    MainPageComponent,
    BoardItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProjectManagementAppRoutingModule,
    DragDropModule,
  ],
})
export class ProjectManagementAppModule {}
