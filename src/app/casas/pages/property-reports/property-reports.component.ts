import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-property-reports',
  templateUrl: './property-reports.component.html',
  styleUrls: ['./property-reports.component.css']
})
export class PropertyReportsComponent {
  constructor(
    private propertyService: PropertyService
  ){}

  ngOnInit(){
  }
  clientId!: 3;
  searchText: string = '';
  filteredCasas: any = [];
  properties: any;

  // Datos para la paginación
  pageSize = 6; // Tamaño de la página
  currentPage = 0; // Página actual
  totalPages: number = 0; // Total de páginas

  cities = 'propert'
  reports = [
    {
    fecha: "noviembre 2023",
    cantidad: 2,
    informe: 'text.txt'
   },
   {
    fecha: "noviembre 2023",
    cantidad: 2,
    informe: 'text.txt'
   },
   {
    fecha: "noviembre 2023",
    cantidad: 2,
    informe: 'text.txt'
   },
   {
    fecha: "noviembre 2023",
    cantidad: 2,
    informe: 'text.txt'
   },
   {
    fecha: "noviembre 2023",
    cantidad: 2,
    informe: 'text.txt'
   },
   {
    fecha: "noviembre 2023",
    cantidad: 2,
    informe: 'text.txt'
   },
   {
    fecha: "noviembre 2023",
    cantidad: 2,
    informe: 'text.txt'
   },
   {
    fecha: "noviembre 2023",
    cantidad: 2,
    informe: 'text.txt'
   },
   {
    fecha: "noviembre 2023",
    cantidad: 2,
    informe: 'text.txt'
   },
  ]



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
    // this.filterData(); // Método para filtrar los datos según el criterio de búsqueda
    this.calculateTotalPages(); // Método para recalcular el total de páginas
  }


}
