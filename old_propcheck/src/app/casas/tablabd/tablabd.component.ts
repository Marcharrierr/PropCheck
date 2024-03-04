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

  @Output() casas = [
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
      comunidad: 'Comunidad en línea',
      direccion: 'Suecia 1561',
      unidad: 'DPTO 208',
      comuna: 'Independencia ',
      detProp: true,
      deuda: 175035,
    },
    {
      comunidad: 'Edifito',
      direccion: 'Toro Mazotte 110',
      unidad: 'DPTO 1212',
      comuna: 'Estación Central',
      detProp: true,
      deuda: 149350,
    },
    {
      comunidad: 'Comunidad Feliz',
      direccion: 'Huerfanos 574',
      unidad: 'DPTO 803',
      comuna: 'Santiago centro',
      detProp: true,
      deuda: 148500,
    },
    {
      comunidad: 'Comunidad Feliz',
      direccion: 'Huerfanos 574',
      unidad: 'DPTO 803',
      comuna: 'Santiago centro',
      detProp: true,
      deuda: 148500,
    },
    {
      comunidad: 'Comunidad Feliz',
      direccion: 'Huerfanos 574',
      unidad: 'DPTO 803',
      comuna: 'Santiago centro',
      detProp: true,
      deuda: 148500,
    },
    {
      comunidad: 'Comunidad Feliz',
      direccion: 'Huerfanos 574',
      unidad: 'DPTO 803',
      comuna: 'Santiago centro',
      detProp: true,
      deuda: 148500,
    },
    {
      comunidad: 'Comunidad Feliz',
      direccion: 'Huerfanos 574',
      unidad: 'DPTO 803',
      comuna: 'Santiago centro',
      detProp: true,
      deuda: 148500,
    },
    {
      comunidad: 'Comunidad Feliz',
      direccion: 'Huerfanos 574',
      unidad: 'DPTO 803',
      comuna: 'Santiago centro',
      detProp: true,
      deuda: 148500,
    },

    {
      comunidad: 'Comunidad Feliz',
      direccion: 'Huerfanos 574',
      unidad: 'DPTO 803',
      comuna: 'Santiago centro',
      detProp: true,
      deuda: 148500,
    },
  ];

  clientId!: 3;
  searchText: string = '';
  filteredCasas: any;
  ngOnInit() {
    this.filterData()
    this.calculateTotalPages()
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
  }

    this.filteredCasas = this.casas.filter(casa =>
      casa.direccion.toLowerCase().includes(this.searchText.toLowerCase()) ||
      casa.comuna.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // Datos para la paginación
  pageSize = 6; // Tamaño de la página
  currentPage = 0; // Página actual
  totalPages: number = 0; // Total de páginas

  // Método para obtener los datos de la página actual
  getCurrentPageData() {
    const startIndex = this.currentPage * this.pageSize;
    return this.filteredCasas.slice(startIndex, startIndex + this.pageSize);
  }

  // Método para cambiar a la página siguiente
  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.filteredCasas.length) {
      this.currentPage++;
    }
  }
  // Método para calcular el total de páginas
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.filteredCasas.length / this.pageSize);
  }

  // Método para cambiar a la página anterior
  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  onPageChange(event: any) {
    // Restablece la página actual al número de página seleccionado por el paginador
    console.log('event',event.page - 1)
    if(event.page == 0){
      this.currentPage = 1
    }else{
      this.currentPage = event.page - 1;
    }

    // Llama al método para obtener los datos de la página actual
    // y actualiza la lista de datos que se muestra en tu componente.
    // Por ejemplo:
    this.updateData();
  }

  // Método para actualizar los datos que se muestran en tu componente
  updateData() {
    // Aquí puedes llamar a tus métodos para filtrar los datos, calcular las páginas, etc.
    // Por ejemplo:
    this.filterData(); // Método para filtrar los datos según el criterio de búsqueda
    this.calculateTotalPages(); // Método para recalcular el total de páginas
    // this.getCurrentPageData(); // No es necesario llamar a este método aquí, ya que el paginador se encarga de manejar la paginación.
  }

}
