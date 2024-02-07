import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PrimeNGConfig } from 'primeng/api';


import { PropertyService } from '../../services/property.service';
import { Property } from '../../interfaces/property.interface';



@Component({
  selector: 'app-tablabd',
  templateUrl: './tablabd.component.html',
  styles: [
  ]
})
export class TablabdComponent implements OnInit {

  propiedades!: Property[];

  opcionSeleccionada: any;

  loading: boolean = true;

  constructor(
    private config: PrimeNGConfig,
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) { }

  isLandingComponent() {
    return this.route.snapshot.url[0].path === 'landing';
  }

  clientId!: 3;

  ngOnInit() {
    //this.loading = true;
    this.propertyService.getPropertiesByClientId(this.clientId)
      .subscribe(propiedades => {

        this.propiedades = propiedades;
        console.log(propiedades)
        //this.loading = false;
      });

  }


  deleteProperty(id: number) {
    console.log(id)
  }


}
