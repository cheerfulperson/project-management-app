import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'boards/:id', component: BoardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectManagementAppRoutingModule {}
