import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PrimeNGConfig } from 'primeng/api';

import { Propiedades } from '../interfaces/propiedades.interface';


@Component({
  selector: 'app-tablabd',
  templateUrl: './tablabd.component.html',
  styles: [
  ]
})
export class TablabdComponent implements OnInit {


  propiedades!: Propiedades[];


  opcionSeleccionada: any;



  loading: boolean = true;

  constructor(
    private config: PrimeNGConfig,
    private route: ActivatedRoute,
  ) { }

  isLandingComponent() {
    return this.route.snapshot.url[0].path === 'landing';
  }


  ngOnInit() {

  }


  public propiedad: Propiedades[] = [
    {
      comunidad: 'Comunidad Feliz',
      direccion: 'Merced 691',
      unidad: 'DPTO 1011',
      comuna: 'Santiago centro',
      detProp: true,
      deuda: 103557
    },
    {
      comunidad: 'Edifito',
      direccion: 'Maria Auxiliadora 721',
      unidad: 'DPTO 1401A',
      comuna: 'San Miguel',
      detProp: true,
      deuda: 153625
    },
    {
      comunidad: 'Edifito',
      direccion: 'Almirante Pastene 70',
      unidad: 'DPTO 703',
      comuna: 'Providencia',
      detProp: true,
      deuda: 160622
    },
    {
      comunidad: 'Edipro',
      direccion: 'Villasana 1451',
      unidad: 'DPTO 1205A',
      comuna: 'Quinta Normal',
      detProp: true,
      deuda: 110652
    },
    {
      comunidad: 'Edipro',
      direccion: 'El Molino 1755',
      unidad: 'DPTO 307',
      comuna: 'Independencia',
      detProp: true,
      deuda: 308245
    },
    {
      comunidad: 'Kastor',
      direccion: 'José Manuel Balmaceda 3751',
      unidad: 'DPTO 403D',
      comuna: 'Renca',
      detProp: true,
      deuda: 235012
    },
    {
      comunidad: 'Comunidad en línea',
      direccion: 'Carlos Antunez 1866',
      unidad: 'DPTO 503',
      comuna: 'Estación Central',
      detProp: true,
      deuda: 10505
    },
    {
      comunidad: 'Comunidad en línea',
      direccion: 'Suecia 1561',
      unidad: 'DPTO 208',
      comuna: 'Independencia ',
      detProp: true,
      deuda: 175035
    },
    {
      comunidad: 'Edifito',
      direccion: 'Toro Mazotte 110',
      unidad: 'DPTO 1212',
      comuna: 'Estación Central',
      detProp: true,
      deuda: 149350
    },
    {
      comunidad: 'Comunidad Feliz',
      direccion: 'Huerfanos 574',
      unidad: 'DPTO 803',
      comuna: 'Santiago centro',
      detProp: true,
      deuda: 148500
    },
  ]











}
