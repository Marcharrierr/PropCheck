import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../../../interfaces/property.interface';
import { PropertyService } from '../../../services/property.service';

import { Municipality, PropertyServices, Region } from '../../../interfaces/property_service.interface';
import { PropertyServiceService } from '../../../services/property-service.service';
import { CreateServiceService } from '../../../services/create-service.service';
import { switchMap } from 'rxjs';





class TablaHash {
  private tabla: { [llave: string]: any } = {};

  set(llave: string, valor: any) {
    this.tabla[llave] = valor;
  }

  get(llave: string) {
    return this.tabla[llave];
  }
}






@Component({
  selector: 'app-casas-page',
  templateUrl: './edit-propiedades-page.component.html',
  styles: [
  ]
})
export class EditPropiedadesPageComponent implements OnInit {

  value!: string;
  checked!: boolean;

  //loading: boolean = true;


  private tablaHash = new TablaHash();

  loading: boolean = false;

  public myProperty: FormGroup = this.fb.group({

    type: ['', Validators.required],
    region: ['', Validators.required],
    municipality: ['', Validators.required],
    address: ['', Validators.required],
    community_name: ['', Validators.required],
    department: ['', Validators.required],
    tower: [''],

  })

  public myPropertyService: FormGroup = this.fb.group({

    luz: ['', Validators.required],
    agua: ['', Validators.required],
    gas: ['', Validators.required],
    ggcc: ['', Validators.required],
    contri: ['', Validators.required],
    aseo: ['', Validators.required],
    luzId: [''],
    aguaId: [''],
    gasId: [''],
    ggccId: [''],
    contriId: ['14'],
    aseoId: ['13'],
    // luzClientId: [''],
    // aguaClientId: [''],
    // gasClientId: [''],
    // ggccClientId: [''],
    // contriClientId: [''],
    // aseoClientId: [''],

    luzControl: new FormControl(),
    aguaControl: new FormControl(),
    gasControl: new FormControl(),
    ggccControl: new FormControl(),
    luzNoService: new FormControl(false),
    aguaNoService: new FormControl(false),
    gasNoService: new FormControl(false),
    ggccNoService: new FormControl(false)

  })

  public regionControl: FormControl = this.myProperty.get('region') as FormControl;
  public municipalityControl: FormControl = new FormControl();

  public property_dataProperty!: Property;
  public property_dataServiceProperty!: PropertyServices[];
  id: number;
  serviceIdMaped: any;

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private propertyServiceService: PropertyServiceService,
    private createService: CreateServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.id = Number(activatedRoute.snapshot.paramMap.get('id'));
    console.log(activatedRoute.snapshot.paramMap.get('id'))


  }




  // get type(): Type[] {
  //   return this.propertyService.type;
  // }

  get region(): Region[] {
    return this.propertyService.region;
  }

  get municipality(): Municipality[] {
    return this.propertyService.municipality;
  }

  serviceProperties: any;

  community_rut!: number;
  community_dv!: string;
  community_name!: string;
  address!: string;
  tower!: string;
  department!: string;
  luz!: string;
  agua!: string;
  gas!: string;
  ggcc!: string;









  ngOnInit(): void {




    this.regionControl.valueChanges.subscribe(selectedRegion => {
      if (selectedRegion === Region.coquimbo) {
        this.municipalityControl.setValue([Municipality.laSerena]);
      } else {
        this.municipalityControl.setValue(this.propertyService.municipality.filter(municipality => municipality !== Municipality.laSerena));
      }
    });


    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.propertyService.getPropertiesById(id))
      ).subscribe(property => {
        if (!property) return this.router.navigate(['/propiedades/landing']);
        this.property_dataProperty = property[0];
        console.log("property_dataServiceProperty: ", this.property_dataProperty);

        return;
      });



    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.propertyService.getPropertyServiceById(id))
      ).subscribe(property_s => {
        this.property_dataServiceProperty = property_s;
        console.log("property_dataServiceProperty: ", property_s)
        return;

      })






    // this.propertyServiceService.getServiceProperties().subscribe(data => {
    //   this.serviceProperties = data;

    //   this.property_dataServiceProperty.forEach((element) => {
    //     let serviceId = element.service_id;

    //     for (let category in this.serviceProperties) {
    //       let services = this.serviceProperties[category];

    //       for (let i = 0; i < services.length; i++) {
    //         if (services[i].id === serviceId) {
    //           let control = this.myPropertyService.get(category);
    //           let controlControl = this.myPropertyService.get(`${category}Control`);
    //           let clientIdControl = this.myPropertyService.get(`${category}ClientId`);
    //           if (control && controlControl && clientIdControl) {
    //             control.patchValue(services[i].service_id);
    //             controlControl.patchValue(services[i]);
    //             clientIdControl.patchValue(services[i].service_client_id);
    //           }
    //           break;
    //         }
    //       }
    //     }
    //   });
    // });


    this.getPropertyServiceById(this.id);









    // this.loading = true;
    // this.propertyServiceService.getServiceProperties().subscribe(data => {
    //   this.serviceProperties = data;

    //   this.property_dataServiceProperty.forEach((element) => {
    //     let serviceId = element.service_id;


    //     for (let category in this.serviceProperties) {
    //       let services = this.serviceProperties[category];

    //       for (let i = 0; i < services.length; i++) {
    //         if (services[i].id === serviceId) {
    //           let control = this.myPropertyService.get(category);
    //           let controlControl = this.myPropertyService.get(`${category}Control`);
    //           if (control && controlControl) {
    //             control.patchValue(services[i].service_client_id);
    //             controlControl.patchValue(services[i]);
    //             console.log('datos services [i]: ', services[i])
    //           }
    //           break;
    //         }
    //       }
    //     }
    //   });
    //   this.loading = false;
    // });



    this.propertyServiceService.getServiceProperties().subscribe(data => {
      this.serviceProperties = data;

      this.property_dataServiceProperty.forEach((element) => {
        let serviceId = element.service_id;

        for (let categoria in this.serviceProperties) {
          let items = this.serviceProperties[categoria];

          for (let item of items) {
            if (item.id === serviceId) {
              this.tablaHash.set(serviceId.toString(), {
                categoria: categoria,
                data: element
              });
              break;
            }
          }
        }

        // Mapear los datos a los dropdowns
        for (let key of ['luz', 'agua', 'gas', 'ggcc', 'contri', 'aseo']) {
          let control = this.myPropertyService.get(key);
          let controlControl = this.myPropertyService.get(`${key}Control`);
          if (control && controlControl) {
            let service = this.tablaHash.get(control.value);
            if (service && service.categoria === key) {
              control.patchValue(service.data.service_client_id);
              controlControl.patchValue(service.data);
            }
          }
        }
      });
    });





  }


  // public formType!: Type;
  public formRegion!: Region;
  public formMunicipality!: Municipality;
  public luzControl!: string;
  public aguaControl!: string;
  public gasControl!: string;
  public ggccControl!: string;
  public contri!: string;
  public aseo!: string;
  luzNoService: boolean = false;
  aguaNoService: boolean = false;
  gasNoService: boolean = false;
  ggccNoService: boolean = false;


  getPropertyServiceById(id: number) {
    this.propertyService.getPropertyServiceById(id).subscribe((data: PropertyServices[]) => {
      console.log('Data: ', data)

    })
  }


  onCheckboxChange(event: any, category: string) {


    const noServiceControl = this.myPropertyService.get(`${category}NoService`);
    const control = this.myPropertyService.get(category);
    const controlControl = this.myPropertyService.get(`${category}Control`);

    if (noServiceControl && control && controlControl) {
      noServiceControl.setValue(event.checked);
      if (noServiceControl.value) {
        control.disable();
        controlControl.disable();
      } else {
        control.enable();
        controlControl.enable();
      }
    }

    switch (category) {
      case 'luz':
        this.luzNoService = this.myPropertyService.get('luzNoService')!.value;
        break;
      case 'agua':
        this.aguaNoService = this.myPropertyService.get('aguaNoService')!.value;
        break;
      case 'gas':
        this.gasNoService = this.myPropertyService.get('gasNoService')!.value;
        break;
      case 'ggcc':
        this.ggccNoService = this.myPropertyService.get('gcNoService')!.value;
        break;
    }

  }




  onDropdownChange(service_id: number, category: string) {
    const control = this.myPropertyService.get(`${category}Id`);
    if (control) {
      control.setValue(service_id);
    } else {
      console.error(`Control ${category}Id does not exist.`);
    }
  }


  // onTypeChange(newValue: Type) {
  //   this.myProperty.controls['type'].setValue(newValue);
  // }




  onSubmitProperty() {

    this.myProperty.get('municipality')!.setValue(Municipality.laSerena);
    this.myProperty.get('municipality')!.updateValueAndValidity();


    this.community_rut = 1;
    this.community_dv = '9';
    this.community_name = this.myProperty.get('community_name')!.value;
    // this.formType = this.myProperty.get('type')!.value;
    this.formRegion = this.myProperty.get('region')!.value;
    this.formMunicipality = this.myProperty.get('municipality')!.value;
    this.address = this.myProperty.get('address')!.value;
    this.tower = this.myProperty.get('tower')!.value;
    this.department = this.myProperty.get('department')!.value;


  };

  onSubmitPropertyService() {

    this.luz = this.myPropertyService.get('luz')!.value;
    this.luzControl = this.myPropertyService.get('luzControl')!.value;
    this.luzNoService = this.myPropertyService.get('luzNoService')!.value;

    this.agua = this.myPropertyService.get('agua')!.value;
    this.aguaControl = this.myPropertyService.get('aguaControl')!.value;
    this.aguaNoService = this.myPropertyService.get('aguaNoService')!.value;

    this.gas = this.myPropertyService.get('gas')!.value;
    this.gasControl = this.myPropertyService.get('gasControl')!.value;
    this.gasNoService = this.myPropertyService.get('gasNoService')!.value;

    this.ggcc = this.myPropertyService.get('ggcc')!.value;
    this.ggccControl = this.myPropertyService.get('ggccControl')!.value;
    this.ggccNoService = this.myPropertyService.get('ggccNoService')!.value;

    this.contri = this.myPropertyService.get('contri')!.value;
    this.aseo = this.myPropertyService.get('aseo')!.value;


  };



  onSubmitButton() {

    console.log('Datos property: ', this.myProperty.value)
    console.log('Datos property_service: ', this.myPropertyService.value)

    this.createService.crearProperty(this.myProperty.value).subscribe({
      next: (property_id: number) => {
        this.asociarServicios(property_id);
      },
      error: (error: any) => {
        console.error("mensaje de error:", error);
      }
    });
  }

  asociarServicios(property_id: number) {
    const servicios = [];
    const serviceNames = ['luz', 'agua', 'gas', 'ggcc', 'contri', 'aseo'];

    for (let key of serviceNames) {
      const nameNoService = `${key}NoService`;
      if (!this.myPropertyService.get(nameNoService)?.value) {
        const service_id = this.myPropertyService.get(`${key}Id`)?.value;
        const service_client_id = this.myPropertyService.get(key)?.value;
        servicios.push({
          property_id: property_id,
          service_id: service_id,
          service_client_id: service_client_id,
          created: new Date().toISOString(),
          modified: new Date().toISOString()
        });
      }
    }
    console.log("Datos a enviar: ", { servicios });

    this.createService.createPropertyService(servicios).subscribe({
      next: (response: any) => {
        console.log("property:", this.myProperty.value)
        console.log(response);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }



}
