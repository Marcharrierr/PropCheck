import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css'],
})
export class InformeComponent {
  sidebarVisible!: boolean;
  messages: Message[] | undefined;

  ngOninit() {

  }

  correoElectronico: string = 'cgomez@propcheck.ai';
  enviarCorreo() {
    window.location.href = `mailto:${this.correoElectronico}`;
  }
}
