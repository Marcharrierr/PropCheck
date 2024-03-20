import { NgModule } from '@angular/core';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { AppsCardComponent } from './apps-card/apps-card.component';
import { CommonModule } from '@angular/common';
import { MaingraphComponent } from './maingraph/maingraph.component';
import { GraphComponent } from './graph/graph.component';
import { ChartModule } from 'primeng/chart';
import { AppsCardPropertiesComponent } from './apps-card-properties/apps-card-properties.component';
import { HomeSidebarComponent } from './home-sidebar/home-sidebar.component';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';

import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {RippleModule} from 'primeng/ripple';


@NgModule({
  declarations: [
    Error404PageComponent,
    AppsCardComponent,
    MaingraphComponent,
    GraphComponent,
    AppsCardPropertiesComponent,
    HomeSidebarComponent,
  ],
  imports: [
    CommonModule,
    ChartModule,
    ButtonModule,
    ImageModule,
    SidebarModule,
    RouterModule,
    ConfirmDialogModule,
    ToastModule,
    ProgressSpinnerModule,
    RippleModule,
  ],
  exports: [
    Error404PageComponent,
    AppsCardComponent,
    GraphComponent,
    MaingraphComponent,
    AppsCardPropertiesComponent,
    HomeSidebarComponent,
    RouterModule,
  ],
})
export class SharedModule {}
