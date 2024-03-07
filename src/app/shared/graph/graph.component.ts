import { Component, Input, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent {
  @Input() titulo: any;
  @Input() gasto: any;
  data: any;
  options: any;
  total = 30;
  deuda = 20;
  aldia: any;
  deudaPorcentaje: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gasto']) {
      this.total = this.gasto[0]['debt-free-properties'] +this.gasto[0]['debt-properties']
      this.deuda = this.gasto[0]['debt-properties']
      console.log(this.deuda)
      this.deudaPorcentaje = Math.round((this.deuda / this.total) * 100);
      this.aldia = this.gasto[0]['debt-properties'] - this.gasto[0]['debt-free-properties']
      console.log('changes', this.deudaPorcentaje)
      this.data = {
        datasets: [
          {
            data: [this.total, this.deuda],
            backgroundColor: [
              '#8A96AE',
              '#D44848',
            ]
          }
        ],
      };

      this.options = {
        cutout: '85%',
      };
    }
  }
  constructor() {
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
