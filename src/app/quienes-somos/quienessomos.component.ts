import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-quienessomos',
  templateUrl: './quienessomos.component.html',
  styleUrls: ['./quienessomos.component.css']
})
export class QuienessomosComponent {
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