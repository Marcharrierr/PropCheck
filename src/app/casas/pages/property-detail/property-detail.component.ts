import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../../services/property.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
})
export class PropertyDetailComponent {
  selectedCity: any;
  property: any;
  propertydataildebt: any;
  status: 'success' | 'error' = 'success';
  iconos = [
    { ruta: 'assets/img/rayoo.svg' },
    { ruta: 'assets/img/aguaa.svg' },
    { ruta: 'assets/img/fuegoo.svg' },
    { ruta: 'assets/img/recicla.svg' },
    { ruta: 'assets/img/property.svg' },
    { ruta: 'assets/img/casaa.svg' },
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService
  ) {}
  ngOnInit(): void {
    // Obtener el ID de la propiedad de los parámetros de la URL
    const idproperty = this.route.snapshot.paramMap.get('id');
    console.log(idproperty);
    this.getpropertydataildebt();
    // Obtener la información de la propiedad del localStorage
    this.property = JSON.parse(
      localStorage.getItem('selectedProperty') || '{}'
    );
    console.log('this.property', this.property);
  }

  volver() {
    console.log('volver');
    return this.router.navigate(['/propiedades/properties']);
  }
  getpropertydataildebt() {
    try {
      this.propertyService.getPropertiesdebtdetail(2).subscribe(
        (properties) => {
          this.propertydataildebt = properties.map((property: any) => {
            let invoice_due_date_chile = '';
            let icono = '';
            if (property.invoice_due_date) {
              invoice_due_date_chile = formatDate(
                property.invoice_due_date,
                'dd-MM-yyyy',
                'en-US'
              );
            }
            if (property.category == 'LUZ') {
              icono = 'assets/img/rayoo.svg';
            } else if (property.category == 'AGUA') {
              icono = 'assets/img/aguaa.svg';
            } else if (property.category == 'GAS') {
              icono = 'assets/img/fuegoo.svg';
            } else if (property.category == 'ASEO') {
              icono = 'assets/img/recicla.svg';
            } else if (property.category == 'GGCC') {
              icono = 'assets/img/recicla.svg';
            } else if (property.category == 'CONTRIBUCIONES') {
              icono = 'assets/img/property.svg';
            }
            return {
              ...property,
              invoice_due_date_chile: invoice_due_date_chile,
              iconoDebt: icono,
            };
          });
          console.log('this', this.propertydataildebt);
          this.status = 'success';
        },
        (error) => {
          this.status = 'error';
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
}
