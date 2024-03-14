import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-sidebar',
  templateUrl: './home-sidebar.component.html',
  styleUrls: ['./home-sidebar.component.css']
})
export class HomeSidebarComponent {
  sidebarVisible!: boolean;
}