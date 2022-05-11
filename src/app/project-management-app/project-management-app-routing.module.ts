import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { BoardComponent } from './components/board/board.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'boards', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'boards/:id', component: BoardComponent, canActivate: [AuthGuard] },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectManagementAppRoutingModule {}
