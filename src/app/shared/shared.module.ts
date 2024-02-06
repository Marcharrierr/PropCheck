
import { NgModule } from '@angular/core';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { AppsCardComponent } from './apps-card/apps-card.component';



@NgModule({
  declarations: [
    Error404PageComponent,
    AppsCardComponent,

  ],
  imports: [],
  exports: [
    Error404PageComponent,
    AppsCardComponent
  ]
})
export class SharedModule { }
