import { RouterModule } from '@angular/router';

import { PrimengModule } from '../primeng/primeng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RecoverPageComponent } from './pages/send-email/send-email.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';


import { ReactiveFormsModule } from '@angular/forms';


import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';


@NgModule({
  declarations: [
    LayoutPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    RecoverPageComponent,
    RecoverPasswordComponent
    

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    PrimengModule,
    ReactiveFormsModule,
    RouterModule

  ]
})
export class AuthModule { }
