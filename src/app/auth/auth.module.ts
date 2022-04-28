import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [SignUpComponent, LoginComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
