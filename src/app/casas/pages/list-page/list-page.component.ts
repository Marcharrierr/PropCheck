import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/domain/product';





@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})


export class ListPageComponent implements OnInit {

  products!: Product[];

  selectedProduct!: Product;

  loading: boolean = true;




  // list-page.component.js
  @ViewChild('dt1', { static: false }) dt1!: ElementRef;


  ngOnInit() {

  }







}
