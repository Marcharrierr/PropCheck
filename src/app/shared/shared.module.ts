
import { NgModule } from '@angular/core';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { AppsCardComponent } from './apps-card/apps-card.component';
import { CommonModule } from '@angular/common';
import { MaingraphComponent } from './maingraph/maingraph.component';
import { GraphComponent } from './graph/graph.component';
import { ChartModule } from 'primeng/chart';
import { AppsCardPropertiesComponent } from './apps-card-properties/apps-card-properties.component';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    Error404PageComponent,
    AppsCardComponent,
    MaingraphComponent,
    GraphComponent,
    AppsCardPropertiesComponent,
  ],
  imports: [CommonModule, ChartModule,ConfirmDialogModule, ToastModule],
  exports: [
    Error404PageComponent,
    AppsCardComponent,
    GraphComponent,
    MaingraphComponent,
    AppsCardPropertiesComponent,
    ToastModule
  ],
  providers: [
    ConfirmationService, // Añade ConfirmationService a los proveedores
  ]
})
export class SharedModule { }
