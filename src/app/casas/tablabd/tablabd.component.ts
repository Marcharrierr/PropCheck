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

  constructor(
    private config: PrimeNGConfig,
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) {}

  isLandingComponent() {
    return this.route.snapshot.url[0].path === 'landing';
  }

  casas = [
    {
      comunidad: 'Comunida Feliz',
      direccion: 'Merced 691',
      unidad: 'DPTO 1011',
      comuna: 'Santiago centro',
      detProp: true,
      deuda: 103557,
    },
    {
      comunidad: 'Edifito',
      direccion: 'Maria Auxiliadora 721',
      unidad: 'DPTO 1401A',
      comuna: 'San Miguel',
      detProp: true,
      deuda: 153625,
    },
    {
      comunidad: 'Edifito',
      direccion: 'Almirante Pastene 70',
      unidad: 'DPTO 703',
      comuna: 'Providencia',
      detProp: true,
      deuda: 160622,
    },
    {
      comunidad: 'Comunida Feliz',
      direccion: 'Merced 691',
      unidad: 'DPTO 1011',
      comuna: 'Santiago centro',
      detProp: true,
      deuda: 103557,
    },
    {
      comunidad: 'Edifito',
      direccion: 'Maria Auxiliadora 721',
      unidad: 'DPTO 1401A',
      comuna: 'San Miguel',
      detProp: true,
      deuda: 153625,
    },
    {
      comunidad: 'Edifito',
      direccion: 'Almirante Pastene 70',
      unidad: 'DPTO 703',
      comuna: 'Providencia',
      detProp: true,
      deuda: 160622,
    },
    {
      comunidad: 'Comunida Feliz',
      direccion: 'Merced 691',
      unidad: 'DPTO 1011',
      comuna: 'Santiago centro',
      detProp: true,
      deuda: 103557,
    },
    {
      comunidad: 'Edifito',
      direccion: 'Maria Auxiliadora 721',
      unidad: 'DPTO 1401A',
      comuna: 'San Miguel',
      detProp: true,
      deuda: 153625,
    },
    {
      comunidad: 'Edifito',
      direccion: 'Almirante Pastene 70',
      unidad: 'DPTO 703',
      comuna: 'Providencia',
      detProp: true,
      deuda: 160622,
    },
    {
      comunidad: 'Comunida Feliz',
      direccion: 'Merced 691',
      unidad: 'DPTO 1011',
      comuna: 'Santiago centro',
      detProp: true,
      deuda: 103557,
    },
    {
      comunidad: 'Edifito',
      direccion: 'Maria Auxiliadora 721',
      unidad: 'DPTO 1401A',
      comuna: 'San Miguel',
      detProp: true,
      deuda: 153625,
    },
    {
      comunidad: 'Edifito',
      direccion: 'Almirante Pastene 70',
      unidad: 'DPTO 703',
      comuna: 'Providencia',
      detProp: true,
      deuda: 160622,
    },
    {
      comunidad: 'Edi',
      direccion: 'Almirante Pastene 70',
      unidad: 'DPTO 701',
      comuna: 'Providencialmente',
      detProp: true,
      deuda: 160622,
    },
    {
      comunidad: 'Edipro',
      direccion: 'Villasana 1451',
      unidad: 'DPTO 1205A',
      comuna: 'Quinta Normal',
      detProp: true,
      deuda: 110652,
    },
    {
      comunidad: 'Edipro',
      direccion: 'El Molino 1755',
      unidad: 'DPTO 307',
      comuna: 'Independencia',
      detProp: true,
      deuda: 308245,
    },
    {
      comunidad: 'Kastor',
      direccion: 'José Manuel Balmaceda 3751',
      unidad: 'DPTO 403D',
      comuna: 'Renca',
      detProp: true,
      deuda: 235012,
    },
    {
      comunidad: 'Comunidad en línea',
      direccion: 'Carlos Antunez 1866',
      unidad: 'DPTO 503',
      comuna: 'Estación Central',
      detProp: true,
      deuda: 10505,
    },
    {
      comunidad: 'Edipro',
      direccion: 'Villasana 1451',
      unidad: 'DPTO 1205A',
      comuna: 'Quinta Normal',
      detProp: true,
      deuda: 110652,
    },
    {
      comunidad: 'Edipro',
      direccion: 'El Molino 1755',
      unidad: 'DPTO 307',
      comuna: 'Independencia',
      detProp: true,
      deuda: 308245,
    },
    {
      comunidad: 'Kastor',
      direccion: 'José Manuel Balmaceda 3751',
      unidad: 'DPTO 403D',
      comuna: 'Renca',
      detProp: true,
      deuda: 235012,
    },
    {
      comunidad: 'Comunidad en línea',
      direccion: 'Carlos Antunez 1866',
      unidad: 'DPTO 503',
      comuna: 'Estación Central',
      detProp: true,
      deuda: 10505,
    },
    {
      comunidad: 'Edipro',
      direccion: 'Villasana 1451',
      unidad: 'DPTO 1205A',
      comuna: 'Quinta Normal',
      detProp: true,
      deuda: 110652,
    },
    {
      comunidad: 'Edipro',
      direccion: 'El Molino 1755',
      unidad: 'DPTO 307',
      comuna: 'Independencia',
      detProp: true,
      deuda: 308245,
    },
    {
      comunidad: 'Kastor',
      direccion: 'José Manuel Balmaceda 3751',
      unidad: 'DPTO 403D',
      comuna: 'Renca',
      detProp: true,
      deuda: 235012,
    },
    {
      comunidad: 'Comunidad en línea',
      direccion: 'Carlos Antunez 1866',
      unidad: 'DPTO 503',
      comuna: 'Estación Central',
      detProp: true,
      deuda: 10505,
    },
  ];

  clientId!: 3;
  searchText: string = '';
  filteredCasas: any = [];

  // Datos para la paginación
  pageSize = 6; // Tamaño de la página
  currentPage = 0; // Página actual
  totalPages: number = 0; // Total de páginas

  ngOnInit() {
    this.filterData();
    this.calculateTotalPages();
    this.loading = true;
    this.propertyService.getPropertiesByClientId(3).subscribe((propiedades) => {
      this.propiedades = propiedades;
      console.log(propiedades);
      this.loading = false;
    });
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
      console.log(searchText)
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
      casa.comunidad.toLowerCase().includes(searchText) ||
      casa.direccion.toLowerCase().includes(searchText) ||
      casa.comuna.toLowerCase().includes(searchText)
    );
  }

  // Método para obtener los datos de la página actual
  getCurrentPageData() {
    const startIndex = this.currentPage * this.pageSize; // Ajuste del cálculo del índice de inicio
    const endIndex = Math.min(startIndex + this.pageSize, this.filteredCasas.length);
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
}
