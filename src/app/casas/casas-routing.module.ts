import { CreatePropiedadComponent } from './pages/create-propiedad/create-propiedad.component';
import { LandingComponent } from './pages/landing/landing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditPropiedadesPageComponent } from './pages/edit-propiedades-page/edit-propiedades-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { PerfilCasasPageComponent } from './pages/perfil-casas-page/perfil-casas-page.component';
import { PropertiesComponent } from './pages/properties/properties.component';


//localhost/4200/propiedades
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'list', component: ListPageComponent },
      { path: 'properties', component: PropertiesComponent },
      { path: 'perfil', component: PerfilCasasPageComponent },
      { path: 'landing', component: LandingComponent },
      { path: 'crear-propiedad', component: CreatePropiedadComponent },
      { path: 'editar-propiedad/:id', component: EditPropiedadesPageComponent },
      { path: ':id', component: EditPropiedadesPageComponent },
      { path: '**', redirectTo: 'list' },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasasRoutingModule { }
