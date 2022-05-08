import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserInterceptor } from './auth/interceptors/user.interceptor';
import { CoreModule } from './core/core.module';
import { ProjectManagementClientModule } from './project-management-client/project-management-client.module';
import { ApiService } from './core/services/api.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    ProjectManagementClientModule,
  ],
  providers: [
    ApiService,
    [{ provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true }],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
