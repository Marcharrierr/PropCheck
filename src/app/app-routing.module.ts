import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './guards/is-authenticated.guard';


import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'propiedades',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./casas/casas.module').then(m => m.CasasModule),
  },
  {
    path: 'landing',
    canActivate: [isAuthenticatedGuard],
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
