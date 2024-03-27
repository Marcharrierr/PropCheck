import { ServiceForm } from './../../../interfaces/property_service.interface';
import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Property, TypeProperties } from '../../../interfaces/property.interface';
import { PropertyService } from '../../../services/property.service';

import { Municipality, PropertyServices, Region } from '../../../interfaces/property_service.interface';
import { PropertyServiceService } from '../../../services/property-service.service';
import { CreateServiceService } from '../../../services/create-service.service';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';





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
  typeProperties: any[] = [];
  selectedType: FormControl = new FormControl();
  loading: boolean = true;
  private tablaHash = new TablaHash();

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

    luz: new FormControl('', [Validators.required, Validators.pattern('^\\d+-?[0-9k]?$')]),
    agua: new FormControl('', [Validators.required, Validators.pattern('^\\d+-?[0-9k]?$')]),
    gas: new FormControl(''),
    ggcc: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*-?$')]),
    contri: new FormControl('', [Validators.required, Validators.pattern('^\\d{2,}-?\\d{2,}$')]),
    aseo: new FormControl('', [Validators.required, Validators.pattern('^\\d{2,}-?\\d{2,}$')]),
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

  }) as FormGroup<ServiceForm>

  public regionControl: FormControl = this.myProperty.get('region') as FormControl;
  public municipalityControl: FormControl = new FormControl();
  // public typeProperties!: TypeProperties;
  id: number;
  public property_dataProperty!: Property;
  public property_dataServiceProperty!: PropertyServices[];
  properties!: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private createService: CreateServiceService,
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private propertyServiceService: PropertyServiceService,
    private router: Router,
    private el: ElementRef,
    private cdRef: ChangeDetectorRef,
  ) {
    this.id = Number(activatedRoute.snapshot.paramMap.get('id'));
    console.log("ruta: ", activatedRoute.snapshot.paramMap.get('id'))
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


    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      console.log("ID de la propiedad: ", id);
      // Aquí puedes utilizar el ID para obtener los datos de la propiedad
    });

    this.propertyService.currentProperties.subscribe(properties => {
      this.properties = properties;
      console.log("Propiedades recibidas: ", properties);

    });

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




    const properties = this.propertyService.getProperties();
    const propertyToEdit = properties.find(property => property.id === this.id);
    if (propertyToEdit) {
      this.myProperty.patchValue({
        type: propertyToEdit.type,
        region: propertyToEdit.region,
        municipality: propertyToEdit.municipality,
        address: propertyToEdit.address,
        community_name: propertyToEdit.community_name,
        department: propertyToEdit.department,
        tower: propertyToEdit.tower,
      });



      this.getPropertyServiceById(this.id);

      this.propertyServiceService.getServiceProperties().subscribe(data => {
        this.serviceProperties = data;
        console.log("Log property_dataServiceProperty: ", this.property_dataServiceProperty);

        this.property_dataServiceProperty = [];

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
                // Asigna los valores a los controles de formulario correspondientes
                control.patchValue(service.data.service_client_id);
                controlControl.patchValue(service.data);
              }
            }
          }
        });
        console.log("Tabla hash: ", this.tablaHash);

      });
    }




    this.property_dataServiceProperty.forEach((service) => {
      // Extrae la categoría del nombre del servicio (asumiendo que el nombre del servicio contiene la categoría)
      const category = service.nemo.split('_')[0].toLowerCase();

      // Busca el control de formulario correspondiente a la categoría
      const control = this.myPropertyService.get(category);
      const controlControl = this.myPropertyService.get(`${category}Control`);

      if (control && controlControl) {
        // Asigna los valores a los controles de formulario correspondientes
        control.patchValue(service.service_client_id);
        controlControl.patchValue(service);
      }
    });

    this.myPropertyService.patchValue({
      // Tus actualizaciones aquí
    });

    // Forza la detección de cambios para actualizar la vista
    this.cdRef.detectChanges();




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


  getPropertyServiceById(id: number) {
    this.propertyService.getPropertyServiceById(id).subscribe((data: PropertyServices[]) => {
      console.log('Data: ', data);
      // Asigna los datos recibidos a this.property_dataServiceProperty
      this.property_dataServiceProperty = data;
      // Ahora que this.property_dataServiceProperty ha sido asignado, puedes acceder a él
      console.log("Log property_dataServiceProperty: ", this.property_dataServiceProperty);

      this.updateFormValues(this.property_dataServiceProperty);
      // Itera sobre this.property_dataServiceProperty para asignar cada servicio a la tabla hash
      this.property_dataServiceProperty.forEach((element) => {
        // Utiliza el id del servicio como clave para la tabla hash
        let serviceId = element.id.toString(); // Asegúrate de que 'id' es la propiedad correcta

        // Asigna el servicio a la tabla hash
        this.tablaHash.set(serviceId, {
          categoria: 'Servicio', // Asume que todas las entradas son de la categoría 'Servicio'
          data: element
        });
      });

      console.log("Tabla hash: ", this.tablaHash);
    });
  }


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


  updateFormValues(data: any[]) {
    data.forEach(item => {
      // Suponiendo que 'nemo' contiene la categoría en su nombre
      const category = item.nemo.split('_')[0].toLowerCase(); // Extrae la categoría del 'nemo'

      // Mapea la categoría a un control de formulario específico
      const controlMap: { [key: string]: keyof ServiceForm } = {
        luz: 'luz',
        agua: 'agua',
        gas: 'gas',
        ggcc: 'ggcc',
        aseo: 'aseo',
        contribuciones: 'contri',
      };

      // Verifica si la categoría existe en el mapa de controles
      if (controlMap.hasOwnProperty(category)) {
        // Actualiza el valor del control de formulario correspondiente
        this.myPropertyService.patchValue({ [controlMap[category] as keyof ServiceForm]: item.description });

      }
    });
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
