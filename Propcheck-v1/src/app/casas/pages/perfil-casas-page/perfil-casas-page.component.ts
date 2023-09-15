import { Component, OnInit } from '@angular/core';

import { PrimeNGConfig } from 'primeng/api';

import { Propiedades2 } from '../../interfaces/propiedades2.interface';


@Component({
  selector: 'app-perfil-casas-page',
  templateUrl: './perfil-casas-page.component.html',
  styles: [
  ]
})
export class PerfilCasasPageComponent implements OnInit {

  propiedades!: Propiedades2[];
  opcionSeleccionada: any;
  loading: boolean = true;


  constructor(private config: PrimeNGConfig) { }

  ngOnInit() {
  }

  public propiedades2: Propiedades2[] = [
    {
      luz: 0,
      agua: 19990,
      gas: 20355,
      gastoCom: 0,
      aseo: 330910,
      contri: 0,
      deuda: 350940,
      ultExtraccion: '17-02-23'
    },
    {
      luz: 0,
      agua: 19990,
      gas: 20355,
      gastoCom: 0,
      aseo: 330910,
      contri: 0,
      deuda: 103557,
      ultExtraccion: '17-03-23'
    },
    {
      luz: 0,
      agua: 19990,
      gas: 20355,
      gastoCom: 0,
      aseo: 330910,
      contri: 0,
      deuda: 103557,
      ultExtraccion: '17-04-23'
    },
    {
      luz: 0,
      agua: 19990,
      gas: 20355,
      gastoCom: 0,
      aseo: 330910,
      contri: 0,
      deuda: 103557,
      ultExtraccion: '17-05-23'
    },
    {
      luz: 0,
      agua: 19990,
      gas: 20355,
      gastoCom: 0,
      aseo: 330910,
      contri: 0,
      deuda: 103557,
      ultExtraccion: '17-06-23'
    },
    {
      luz: 0,
      agua: 19990,
      gas: 20355,
      gastoCom: 0,
      aseo: 330910,
      contri: 0,
      deuda: 103557,
      ultExtraccion: '17-07-23'
    },


  ]











}
