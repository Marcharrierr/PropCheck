import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Property } from '../../../interfaces/property.interface';
import { PropertyService } from '../../../services/property.service';
import { switchMap, take } from 'rxjs';
import { Municipality, PropertyServices, Region, Type } from '../../../interfaces/property_service.interface';


@Component({
  selector: 'app-casas-page',
  templateUrl: './edit-propiedades-page.component.html',
  styles: [
  ]
})
export class EditPropiedadesPageComponent implements OnInit {


  public property!: Property;
  public property_s!: PropertyServices[];


  luz: string | undefined;
  agua: string | undefined;
  gas: string | undefined;
  gc: string | undefined;
  aseo: string | undefined;
  contri: string | undefined;
  providerLuz!: { name: string; code: string; }[];
  providerAgua!: { name: string; code: string; }[]
  providerGas!: { name: string; code: string; }[];
  providerGc!: { name: string; code: string; }[];
  providerAseo!: { name: string; code: string; }[];
  providerContri!: { name: string; code: string; }[];


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService,
  ) { }

  get type(): Type[] {
    return this.propertyService.type;
  }

  get region(): Region[] {
    return this.propertyService.region;
  }

  get municipality(): Municipality[] {
    return this.propertyService.municipality;
  }

  clientId!: 3;

  ngOnInit() {


    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.propertyService.getPropertiesById(id))
      ).subscribe(property => {
        if (!property) return this.router.navigate(['/propiedades/landing'])
        this.property = property[0];
        return;
      })



    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.propertyService.getPropertyServiceById(id))
      ).subscribe(property_s => {
        this.property_s = property_s;
        //this.setDropdownValues(this.property_s![0].service_id);

        return;


      })




  }



}
