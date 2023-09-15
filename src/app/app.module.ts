import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { CasasModule } from './casas/casas.module';

import { AppComponent } from './app.component';
import { CarouselComponent } from './component/carousel/carousel.component';
import { HomePageComponent } from './home-page/home-page.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AnimateModule } from 'primeng/animate';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { FormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { MessagesModule } from 'primeng/messages';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CarouselComponent,

  ],
  imports: [
    AnimateModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,

    CardModule,
    CarouselModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ImageModule,
    MessagesModule,
    RippleModule,
    SharedModule,
    StyleClassModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
