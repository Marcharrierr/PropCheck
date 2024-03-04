import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PrimeNGConfig } from 'primeng/api';

import { PropertyService } from '../../services/property.service';
import { Property } from '../../interfaces/property.interface';

@Component({
  selector: 'app-tablabd',
  templateUrl: './tablabd.component.html',
  styles: [],
})
export class TablabdComponent implements OnInit {
  propiedades!: Property[];

  opcionSeleccionada: any;

  loading: boolean = true;
  casas: any;
  constructor(
    private config: PrimeNGConfig,
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) {}

  isLandingComponent() {
    return this.route.snapshot.url[0].path === 'landing';
  }

  clientId!: 3;
  searchText: string = '';
  filteredCasas: any = [];

  // Datos para la paginación
  pageSize = 6; // Tamaño de la página
  currentPage = 0; // Página actual
  totalPages: number = 0; // Total de páginas

  ngOnInit() {
    this.getproperties();
  }

  deleteProperty(id: number) {
    console.log(id);
  }

  filterData(): void {
    if (!this.searchText.trim()) {
      this.filteredCasas = this.casas; // Si no hay texto de búsqueda, mostrar todas las casas
      return;
    } else {
      const searchText = this.searchText.toLowerCase().trim();
      console.log(searchText);
      this.filteredCasas = this.casas.filter((casa: any) =>
        this.matchSearchText(casa, searchText)
      );
      console.log(this.filteredCasas);
      this.calculateTotalPages();
      this.getCurrentPageData();
    }
  }

  matchSearchText(casa: any, searchText: string): boolean {
    return (
      casa.municipality.toLowerCase().includes(searchText) ||
      casa.address.toLowerCase().includes(searchText) ||
      casa.region.toLowerCase().includes(searchText)
    );
  }

  // Método para obtener los datos de la página actual
  getCurrentPageData() {
    const startIndex = this.currentPage * this.pageSize; // Ajuste del cálculo del índice de inicio
    const endIndex = Math.min(
      startIndex + this.pageSize,
      this.filteredCasas.length
    );
    return this.filteredCasas.slice(startIndex, endIndex);
  }

  // Método para calcular el total de páginas
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.filteredCasas.length / this.pageSize);
  }

  onPageChange(event: any) {
    // Restablece la página actual al número de página seleccionado por el paginador
    this.currentPage = event.page;
    this.updateData();
  }

  // Método para actualizar los datos que se muestran en tu componente
  updateData() {
    this.filterData(); // Método para filtrar los datos según el criterio de búsqueda
    this.calculateTotalPages(); // Método para recalcular el total de páginas
  }
  getproperties() {
    try {
      this.propertyService.getPropertiesByClientId(2).subscribe(
        (properties) => {
          this.casas = properties;
          console.log(this.casas);
          this.filterData();
          this.calculateTotalPages();
          this.loading = true;
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
}
