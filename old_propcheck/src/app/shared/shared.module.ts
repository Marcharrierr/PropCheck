
import { NgModule } from '@angular/core';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { AppsCardComponent } from './apps-card/apps-card.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    Error404PageComponent,
    AppsCardComponent,
  ],
  imports: [CommonModule],
  exports: [
    Error404PageComponent,
    AppsCardComponent
  ]
})
export class SharedModule { }
