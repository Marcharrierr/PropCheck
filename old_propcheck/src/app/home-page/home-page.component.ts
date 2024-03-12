import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  Urls: ['./home-page.component.css']
})
export class HomePageComponent {

  sidebarVisible!: boolean;

  messages: Message[] | undefined;

  ngOninit() {

    this.messages = [{ severity: 'success', summary: 'Success', detail: 'Aplicación DEMO' }];

  }




  correoElectronico: string = 'cgomez@propcheck.ai';

  enviarCorreo() {
    window.location.href = `mailto:${this.correoElectronico}`;
  }

}



