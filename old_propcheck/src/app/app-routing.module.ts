import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './guards/is-authenticated.guard';


import { HomePageComponent } from './home-page/home-page.component';
import { RecoverPageComponent } from './auth/pages/send-email/send-email.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { RecoverPasswordComponent } from './auth/pages/recover-password/recover-password.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
    //component: LoginPageComponent
    //component: RecoverPageComponent
    //component: RecoverPasswordComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'propiedades',
    //canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./casas/casas.module').then(m => m.CasasModule),
  },
  {
    path: 'landing',
    //canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./casas/pages/landing/landing.component').then(m => m.LandingComponent),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  },
  {
    path: 'recover-password',
    component: RecoverPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      useHash: true
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
