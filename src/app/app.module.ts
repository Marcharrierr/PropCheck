import { PrimengModule } from './primeng/primeng.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CarouselComponent } from './component/carousel/carousel.component';
import { HomePageComponent } from './home-page/home-page.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AnimateModule } from 'primeng/animate';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ImageModule } from 'primeng/image';
import { MessagesModule } from 'primeng/messages';

import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { MenubarModule } from 'primeng/menubar';
import { InformeComponent } from './informe/informe.component';
import { QuienessomosComponent } from './quienes-somos/quienessomos.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CarouselComponent,
    InformeComponent,
    QuienessomosComponent,
  ],
  imports: [
    AnimateModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,

    CommonModule,
    HttpClientModule,

    CardModule,
    CarouselModule,
    FontAwesomeModule,
    FormsModule,
    ImageModule,
    MessagesModule,
    MenubarModule,
    ReactiveFormsModule,
    PrimengModule,
    RippleModule,
    SharedModule,
    StyleClassModule,


  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule { }
