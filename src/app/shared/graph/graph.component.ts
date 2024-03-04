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
  total = 30;
  deuda = 20;
  deudaPorcentaje = Math.round((this.deuda / this.total) * 100);


  constructor() {
    this.data = {
      datasets: [
        {
          data: [10, 20], // Datos ficticios
          backgroundColor: [
            '#8A96AE',
            '#FF0000',
          ]
        }
      ],
    };

    this.options = {
      cutout: '85%',
    };
  }
  activeItemIndex = NaN;
  colors = ['#ff0000', '#00ff00'];
  readonly value = [80,20];
  readonly labels = ['Al Dia', 'Con Deuda'];

  isItemActive(index: number): boolean {
      return this.activeItemIndex === index;
  }

  onHover(index: number, hovered: boolean): void {
      this.activeItemIndex = hovered ? index : 0;
  }

  getColor(index: number): string {
      return `var(--tui-chart-${index})`;
  }
}
