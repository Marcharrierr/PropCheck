import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../../../interfaces/property.interface';
import { PropertyService } from '../../../services/property.service';

import { Municipality, PropertyServices, Region, Type } from '../../../interfaces/property_service.interface';
import { PropertyServiceService } from '../../../services/property-service.service';
import { CreateServiceService } from '../../../services/create-service.service';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-casas-page',
  templateUrl: './edit-propiedades-page.component.html',
  styles: [
  ]
})
export class EditPropiedadesPageComponent implements OnInit {



  constructor(

  ) {

  }



  ngOnInit(): void {


  }


}
