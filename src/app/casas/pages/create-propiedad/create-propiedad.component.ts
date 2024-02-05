import { Component, OnInit } from '@angular/core';
import { Municipality } from './../../../interfaces/property_service.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PropertyService } from '../../../services/property.service';
import { Region, Type } from 'src/app/interfaces/property_service.interface';
import { PropertyServiceService } from '../../../services/property-service.service'
import { CreateServiceService } from './../../../services/create-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  templateUrl: './create-propiedad.component.html',
  styleUrls: ['./create-propiedad.component.css']
})
export class CreatePropiedadComponent implements OnInit {

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




  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private propertyServiceService: PropertyServiceService,
    private createService: CreateServiceService,
    private router: Router
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

    this.loading = true;
    this.propertyServiceService.getServiceProperties().subscribe(data => {
      this.serviceProperties = data;
      this.loading = false;
    });


  }


  public formType!: Type;
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
    this.aseo = this.myPropertyService.get('aseo')!.value;


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
            title: 'Error al crear la propiedad',
            text: 'Ha ocurrido un error al intentar crear la propiedad. Por favor, inténtelo de nuevo más tarde.',
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
        Swal.fire({
          title: '¡Propiedad creada con éxito!',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          this.router.navigate(['/propiedades/landing']);
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
