
import { NgModule } from '@angular/core';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { AppsCardComponent } from './apps-card/apps-card.component';
import { CommonModule } from '@angular/common';
import { MaingraphComponent } from './maingraph/maingraph.component';
import { GraphComponent } from './graph/graph.component';
import { ChartModule } from 'primeng/chart';


@NgModule({
  declarations: [
    Error404PageComponent,
    AppsCardComponent,
    MaingraphComponent,
    GraphComponent,
  ],
  imports: [CommonModule, ChartModule],
  exports: [
    Error404PageComponent,
    AppsCardComponent,
    GraphComponent,
    MaingraphComponent
  ]
})
export class SharedModule { }
