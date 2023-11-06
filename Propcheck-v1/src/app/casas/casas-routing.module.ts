import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CasasPageComponent } from './pages/casas-page/casas-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { PerfilCasasPageComponent } from './pages/perfil-casas-page/perfil-casas-page.component';


//localhost/4200/casas
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'list', component: ListPageComponent },
      { path: 'perfil', component: PerfilCasasPageComponent },
      { path: ':id', component: CasasPageComponent },
      { path: '**', redirectTo: 'list' },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasasRoutingModule { }
