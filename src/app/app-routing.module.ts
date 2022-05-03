/* eslint-disable @typescript-eslint/typedef */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: async () =>
      import('./project-management-app/project-management-app.module').then(
        (m) => m.ProjectManagementAppModule
      ),
  },
  {
    path: 'auth',
    loadChildren: async () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
