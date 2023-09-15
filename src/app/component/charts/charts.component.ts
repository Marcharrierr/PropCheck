import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {


  data: any;
  dataLuz: any;
  dataAgua: any;
  dataGas: any;
  dataGc: any;
  dataContri: any;
  dataAseo: any;


  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);


    // Datos globales
    this.data = {
      labels: ['Propiedades al día', 'Propiedades con deuda'],
      datasets: [
        {
          data: [540, 325],
          backgroundColor: [documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--red-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--green-300'), documentStyle.getPropertyValue('--red-300')]
        }
      ]
    };
    // Datos Luz
    this.dataLuz = {
      labels: ['Luz al día', 'Luz con deuda'],
      datasets: [
        {
          data: [50, 25],
          backgroundColor: [documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--red-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-300')]
        }
      ]
    };
    // Datos Agua
    this.dataAgua = {
      labels: ['Agua al día', 'Agua con deuda'],
      datasets: [
        {
          data: [40, 35],
          backgroundColor: [documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--red-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-300')]
        }
      ]
    };
    // Datos Gas
    this.dataGas = {
      labels: ['Gas al día', 'Gas con deuda'],
      datasets: [
        {
          data: [54, 32],
          backgroundColor: [documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--red-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-300')]
        }
      ]
    };
    // Datos GC
    this.dataGc = {
      labels: ['Gasto común al día', 'Gasto común con deuda'],
      datasets: [
        {
          data: [540, 325],
          backgroundColor: [documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--red-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-300')]
        }
      ]
    };
    // Datos Contribuciones
    this.dataContri = {
      labels: ['Contribuciones al día', 'Contribuciones con deuda'],
      datasets: [
        {
          data: [540, 325],
          backgroundColor: [documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--red-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-300')]
        }
      ]
    };
    // Datos Aseo
    this.dataAseo = {
      labels: ['Aseo al día', 'Aseo con deuda'],
      datasets: [
        {
          data: [540, 325],
          backgroundColor: [documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--red-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-300')]
        }
      ]
    };

  }
}
