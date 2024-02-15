import { Component, ElementRef, OnInit, ViewChild, Output } from '@angular/core';
import { Product } from '../../../domain/product';





@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})


export class ListPageComponent implements OnInit {

  products!: Product[];
  selectedProduct!: Product;
  loading: boolean = true;
  @Output() tituloLuz = 'Deudores de luz'
  @Output() tituloagua = 'Deudores de agua'
  @Output() titulogas = 'Deudores de gas'
  @Output() tituloGastosComunes = 'Deudores de Gastos Comunes'
  @Output() tituloContribuciones = 'Deudores de Contribuciones'
  @Output() tituloAseo = 'Deudores de Aseo'

  // list-page.component.js
  @ViewChild('dt1', { static: false }) dt1!: ElementRef;


  ngOnInit() {

  }







}
