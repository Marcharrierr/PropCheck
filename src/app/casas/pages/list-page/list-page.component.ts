import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Output,
} from '@angular/core';
import { Product } from '../../../domain/product';
import { PropertyService } from '../../../services/property.service';
import { DebtsSummary } from 'src/app/interfaces/dbtsSummary.dto';
import { map } from 'rxjs';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css'],
})
export class ListPageComponent implements OnInit {
  products!: Product[];
  selectedProduct!: Product;
  loading: boolean = true;
  @Output() tituloLuz = 'Deudores de luz';
  @Output() tituloagua = 'Deudores de agua';
  @Output() titulogas = 'Deudores de gas';
  @Output() tituloGastosComunes = 'Deudores de Gastos Comunes';
  @Output() tituloContribuciones = 'Deudores de Contribuciones';
  @Output() tituloAseo = 'Deudores de Aseo';

  @Output() propertiesdebt: any;

  @Output() gastoLuz:any;
  @Output() gastoagua: any;
  @Output() gastogas: any
  @Output() gastoGastosComunes: any
  @Output() gastoContribuciones: any;
  @Output() gastoAseo:any

  @ViewChild('dt1', { static: false }) dt1!: ElementRef;

  constructor(private propertyService: PropertyService) {}
  ngOnInit() {
    this.getPropertiesdebt();
  }
  getPropertiesdebt() {
    this.propertyService.getPropertiesdebt(3).subscribe(
      (propertiesdebts) => {
        this.gastoLuz = propertiesdebts['debts'].filter((service: any)=> service.category === 'LUZ')
        this.gastoagua = propertiesdebts['debts'].filter((service: any)=> service.category === 'AGUA')
        this.gastogas = propertiesdebts['debts'].filter((service: any)=> service.category === 'GAS')
        this.gastoGastosComunes = propertiesdebts['debts'].filter((service: any)=> service.category === 'GGCC')
        this.gastoContribuciones = propertiesdebts['debts'].filter((service: any)=> service.category === 'CONTRIBUCIONES')
        this.gastoAseo = propertiesdebts['debts'].filter((service: any)=> service.category === 'ASEO')
        console.log('this.gastoGastosComunes', this.gastoGastosComunes)
        this.propertiesdebt = propertiesdebts['debts-summary'];
        this.loading = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
