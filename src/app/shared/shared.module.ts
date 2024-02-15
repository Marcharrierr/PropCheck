
import { NgModule } from '@angular/core';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { AppsCardComponent } from './apps-card/apps-card.component';
import { CommonModule } from '@angular/common';
import { MaingraphComponent } from './maingraph/maingraph.component';
import { GraphComponent } from './graph/graph.component';
import { ChartModule } from 'primeng/chart';
import { TuiRootModule } from '@taiga-ui/core';
import { TuiMoneyModule } from '@taiga-ui/addon-commerce';
import { TuiRingChartModule } from '@taiga-ui/addon-charts';
import {TuiLegendItemModule} from '@taiga-ui/addon-charts';


@NgModule({
  declarations: [

    Error404PageComponent,
    AppsCardComponent,
    MaingraphComponent,
    GraphComponent,
  ],
  imports: [CommonModule, ChartModule, TuiRootModule, TuiMoneyModule, TuiRingChartModule, TuiLegendItemModule],
  exports: [
    Error404PageComponent,
    AppsCardComponent,
    GraphComponent,
    MaingraphComponent
  ]
})
export class SharedModule { }
