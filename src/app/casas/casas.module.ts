import { SidebarComponent } from './../component/sidebar/sidebar.component';



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HttpClient } from '@angular/common/http';



import { CasasPageComponent } from './pages/casas-page/casas-page.component';
import { ChartsComponent } from '../component/charts/charts.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { PerfilCasasPageComponent } from './pages/perfil-casas-page/perfil-casas-page.component';
import { TablabdComponent } from './tablabd/tablabd.component';


import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';



import { ButtonModule } from 'primeng/button';
import { CasasRoutingModule } from './casas-routing.module';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { PrimengModule } from './../primeng/primeng.module';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { SortByPipe } from './pipes/sort-by.pipe';
import { ReplaceCommaPipe } from './pipes/replace-comma.pipe';





export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    CasasPageComponent,
    ChartsComponent,
    LayoutPageComponent,
    ListPageComponent,
    PerfilCasasPageComponent,
    TablabdComponent,
    SidebarComponent,
    SortByPipe,
    ReplaceCommaPipe,


  ],
  imports: [

    ButtonModule,
    CardModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    PrimengModule,
    RippleModule,
    TableModule,


    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  exports: [CasasRoutingModule]
})
export class CasasModule { }
