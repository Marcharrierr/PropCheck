import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-apps-card',
  templateUrl: './apps-card.component.html',
  styleUrls: ['./apps-card.component.css']
})
export class AppsCardComponent {
  @Input() casas: any[] = [];
}
