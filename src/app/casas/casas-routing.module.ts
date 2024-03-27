import { CreatePropiedadComponent } from './pages/create-propiedad/create-propiedad.component';
import { LandingComponent } from './pages/landing/landing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditPropiedadesPageComponent } from './pages/edit-propiedades-page/edit-propiedades-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { PerfilCasasPageComponent } from './pages/perfil-casas-page/perfil-casas-page.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { PropertyDetailComponent } from './pages/property-detail/property-detail.component';
import { PropertyUserProfileComponent } from './pages/property-user-profile/property-user-profile.component';
import { UserResetPasswordComponent } from './pages/user-reset-password/user-reset-password.component';
import { PropertyReportsComponent } from './pages/property-reports/property-reports.component';


//localhost/4200/propiedades
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'reports', component: PropertyReportsComponent },
      { path: 'property-user-profile', component: PropertyUserProfileComponent },
      { path: 'reset-password', component: UserResetPasswordComponent },
      { path: 'list', component: ListPageComponent },
      { path: 'property-detail/:id', component: PropertyDetailComponent },
      { path: 'properties', component: PropertiesComponent },
      { path: 'perfil', component: PerfilCasasPageComponent },
      { path: 'landing', component: LandingComponent },
      { path: 'crear-propiedad', component: CreatePropiedadComponent },
      { path: 'edit-propiedad/:id', component: EditPropiedadesPageComponent },
      //{ path: ':id', component: EditPropiedadesPageComponent },
      { path: '**', redirectTo: 'list' },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasasRoutingModule { }
