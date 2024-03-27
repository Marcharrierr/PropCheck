import { TypeProperties } from './../../../interfaces/property.interface';
import { Component, ElementRef, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Municipality, Region } from 'src/app/interfaces/property_service.interface';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { PropertyService } from 'src/app/services/property.service';
import { PropertyServiceService } from 'src/app/services/property-service.service';
import { CreateServiceService } from 'src/app/services/create-service.service';


@Component({
  templateUrl: './create-propiedad.component.html',
  styleUrls: ['./create-propiedad.component.css']
})
export class CreatePropiedadComponent implements OnInit {

  value!: string;
  checked!: boolean;
  typeProperties: any[] = [];
  selectedType: FormControl = new FormControl();
  loading: boolean = true;


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

    luz: ['', [Validators.required, Validators.pattern('^\\d+-?[0-9k]?$')]],
    agua: ['', [Validators.required, Validators.pattern('^\\d+-?[0-9k]?$')]],
    gas: [''],
    ggcc: ['', [Validators.required, Validators.pattern('^[0-9]*-?$')]],
    contri: ['', [Validators.required, Validators.pattern('^\\d{2,}-?\\d{2,}$')]],
    aseo: ['', [Validators.required, Validators.pattern('^\\d{2,}-?\\d{2,}$')]],
    luzId: [''],
    aguaId: [''],
    gasId: [''],
    ggccId: [''],
    contriId: ['14'],
    aseoId: ['13'],

    luzControl: new FormControl(),
    aguaControl: new FormControl(),
    gasControl: new FormControl(),
    ggccControl: new FormControl(),
    luzNoService: new FormControl(true),
    aguaNoService: new FormControl(true),
    gasNoService: new FormControl(true),
    ggccNoService: new FormControl(true),
    aseoNoService: new FormControl(true),
    contriNoService: new FormControl(true),

  })

  public regionControl: FormControl = this.myProperty.get('region') as FormControl;
  public municipalityControl: FormControl = new FormControl();
  // public typeProperties!: TypeProperties;



  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private propertyServiceService: PropertyServiceService,
    private createService: CreateServiceService,
    private router: Router,
    private el: ElementRef
  ) { }




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


    this.propertyService.getTypeProperties('yourType').subscribe((data: any[]) => {
      this.typeProperties = data.map(type => ({ label: type, value: type }));
    });




    this.regionControl.valueChanges.subscribe(selectedRegion => {
      if (selectedRegion === Region.coquimbo) {
        this.municipalityControl.setValue([Municipality.laSerena]);
      } else {
        this.municipalityControl.setValue(this.propertyService.municipality.filter(municipality => municipality !== Municipality.laSerena));
      }
    });

    // this.loading = true;
    this.propertyServiceService.getServiceProperties().subscribe(data => {
      this.serviceProperties = data;

      // this.loading = false;
    });



  }


  public formType!: TypeProperties;
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
  aseoNoService: boolean = false;
  contriNoService: boolean = false;



  onCheckboxChange(event: any, category: string) {
    console.log(`Cambio en el switch para ${category}`);
    const noServiceControl = this.myPropertyService.get(`${category}NoService`);
    const control = this.myPropertyService.get(category);
    const controlControl = this.myPropertyService.get(`${category}Control`);

    if (noServiceControl && control) {
      noServiceControl.setValue(event.checked);
      if (!event.checked) {
        control.disable();
        // Intenta deshabilitar controlControl solo si existe
        if (controlControl) {
          controlControl.disable();
        }
      } else {
        control.enable();
        // Intenta habilitar controlControl solo si existe
        if (controlControl) {
          controlControl.enable();
        }
      }
    }

    // Actualización de variables de instancia basada en la categoría
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
        this.ggccNoService = this.myPropertyService.get('ggccNoService')!.value;
        break;
      case 'aseo':
        this.aseoNoService = this.myPropertyService.get('aseoNoService')!.value;
        break;
      case 'contri':
        this.contriNoService = this.myPropertyService.get('contriNoService')!.value;
        break;
    }
  }



  onDropdownChange(service_id: number, category: string) {
    const control = this.myPropertyService.get(`${category}Id`);
    if (control) {
      control.setValue(service_id);
      control.updateValueAndValidity();
    } else {
      console.error(`Control ${category}Id does not exist.`);
    }
  }

  validateServices(): boolean {
    const serviceNames = ['luz', 'agua', 'gas', 'ggcc', 'contri', 'aseo'];
    let isValid = true;

    for (let key of serviceNames) {
      const nameNoService = `${key}NoService`;
      const control = this.myPropertyService.get(key);
      const controlControl = this.myPropertyService.get(`${key}Control`);
      const noServiceControl = this.myPropertyService.get(nameNoService);

      // Solo marca el campo como inválido si no se ha seleccionado un proveedor en el dropdown y no se ha activado el switch
      if (!noServiceControl?.value && (!control?.value || !controlControl?.value?.length)) {
        control?.markAsTouched();
        control?.setErrors({ 'required': true });
        isValid = false;
      }
      // Si el switch está activado, no es necesario que haya validación en el input ni en el dropdown
      else if (noServiceControl?.value) {
        control?.clearValidators();
        controlControl?.clearValidators();
      }
    }

    return isValid;
  }







  onSubmitProperty() {

    this.myProperty.get('municipality')!.setValue(Municipality.laSerena);
    this.myProperty.get('municipality')!.updateValueAndValidity();


    this.community_rut = 1;
    this.community_dv = '9';
    this.community_name = this.myProperty.get('community_name')!.value;
    this.formType = this.myProperty.get('type')!.value;
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
    this.contri = this.myPropertyService.get('contriNoService')!.value;

    this.aseo = this.myPropertyService.get('aseo')!.value;
    this.aseo = this.myPropertyService.get('aseoNoService')!.value;

  };



  onSubmitButton() {

    if (this.validateServices()) {
      console.log('Datos property: ', this.myProperty.value)
      console.log('Datos property_service: ', this.myPropertyService.value)

      this.createService.crearProperty(this.myProperty.value).subscribe({
        next: (property_id: number) => {
          this.asociarServicios(property_id);
        },
        error: (error: any) => {
          console.error("mensaje de error:", error);
          Swal.fire({
            title: 'Error ',
            text: 'No puede dejar campos en blanco para crear la propiedad',
            icon: 'error',
            confirmButtonText: 'Entendido'
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, revise los campos y sus proveedores.',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
    }
  }

  asociarServicios(property_id: number) {
    const servicios = [];
    const serviceNames = ['luz', 'agua', 'gas', 'ggcc', 'contri', 'aseo'];

    for (let key of serviceNames) {
      const nameNoService = `${key}NoService`;
      if (this.myPropertyService.get(nameNoService)?.value) {
        const service_id = this.myPropertyService.get(`${key}Id`)?.value;
        const service_client_id = this.myPropertyService.get(key)?.value;
        servicios.push({
          property_id: property_id,
          service_id: service_id,
          service_client_id: service_client_id,
          created: new Date().toISOString(),
          modified: new Date().toISOString()
        });
        console.log("Datos a enviar: ", { servicios });
      }
    }

    this.createService.createPropertyService(servicios).subscribe({
      next: (response: any) => {
        console.log("property:", this.myProperty.value)
        console.log("RESPUESTA: ", response);
        Swal.fire({
          title: '¡Propiedad creada con éxito!',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          this.router.navigate(['/propiedades/properties']);
        });
      },
      error: (error: any) => {
        console.error(error);
        Swal.fire({
          title: 'Error al crear la propiedad',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
}
