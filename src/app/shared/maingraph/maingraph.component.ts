import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-maingraph',
  templateUrl: './maingraph.component.html',
  styleUrls: ['./maingraph.component.css']
})
export class MaingraphComponent {
  @Input() propertiesdebt: any;
  data: any;
  options: any;
  total: any;
  aldia: any;
  // this.propertiesdebt['debt-free-properties'] + this.propertiesdebt['debt-properties'];
  deuda: any;
  titulo = "Porcentaje global de deuda"
  deudaPorcentaje: any;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['propertiesdebt']) {
      this.total = this.propertiesdebt['debt-free-properties'] +this.propertiesdebt['debt-properties']
      this.deuda = this.propertiesdebt['debt-properties']
      this.deudaPorcentaje = Math.round((this.deuda / this.total) * 100);
      this.aldia = this.propertiesdebt['debt-properties'] - this.propertiesdebt['debt-free-properties']
      this.data = {
        datasets: [
          {
            data: [this.total, this.deuda],
            backgroundColor: [
              '#D44848',
              '#8A96AE',
            ]
          }
        ]
      };

      this.options = {
        responsive: true,
        cutout: '85%',
      };
    }
  }
  ngOnInit(): void{
  }
  constructor() {



  }

}
