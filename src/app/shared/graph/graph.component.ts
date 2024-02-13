import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent {
  @Input() titulo: any;
  data: any;
  options: any;

  constructor() {
    this.data = {
      datasets: [
        {
          data: [10, 20], // Datos ficticios
          backgroundColor: [
            '#999999',
            '#FF0000',
          ]
        }
      ]
    };

    this.options = {
      title: {
        display: true,
        text: 'My Title',
        fontSize: 16
      },
      legend: {
        display: false // Elimina la leyenda
      }
    };
  }
}
