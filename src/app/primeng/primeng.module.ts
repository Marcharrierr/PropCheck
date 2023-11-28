import { RouterModule } from '@angular/router';


import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { RippleModule } from 'primeng/ripple';





@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [

    ButtonModule,
    CardModule,
    CarouselModule,
    ChartModule,
    DividerModule,
    DropdownModule,
    FormsModule,
    ImageModule,
    InputTextModule,
    MenubarModule,
    MessagesModule,
    SelectButtonModule,
    SidebarModule,
    TableModule,
    RippleModule,
    RouterModule
  ]
})
export class PrimengModule { }
