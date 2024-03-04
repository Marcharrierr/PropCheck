import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RecoverPageComponent } from './pages/send-email/send-email.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';

//localhost:4200/auth
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent },
      //{ path: '**', redirectTo: 'login' },
      { path: 'recover', component:RecoverPageComponent},
      { path: 'recover-password', component:RecoverPasswordComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
