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
    this.getReports();
  }

  getReports(){
    this.propertyService.getPropertiesReports(3).subscribe(
      (report) => {
        this.reportsProperties = report
        this.formattedData = this.reportsProperties.map((item: any )=> {
          const date = new Date(item.report_date);
          const monthName = date.toLocaleString('es-ES', { month: 'long' });
          const year = date.getFullYear();
          const formattedDate = `${monthName} ${year}`;

          return {
            report_date: formattedDate,
            status: item.status,
            url: item.url
          };
        });

        this.filterData();
        this.calculateTotalPages();
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  reportsProperties: any;
  formattedData: any;
  clientId!: 3;
  searchText: string = '';
  filteredCasas: any = [];
  properties: any;

  // Datos para la paginación
  pageSize = 6; // Tamaño de la página
  currentPage = 0; // Página actual
  totalPages: number = 0; // Total de páginas

  cities = 'propert'


  filterData(): void {
    if (!this.searchText.trim()) {
      this.filteredCasas = this.formattedData; // Si no hay texto de búsqueda, mostrar todas las casas
      return;
    } else {
      const searchText = this.searchText.toLowerCase().trim();
      console.log(searchText);
      this.filteredCasas = this.formattedData.filter((casa: any) =>
        this.matchSearchText(casa, searchText)
      );
      console.log(this.filteredCasas);
      this.calculateTotalPages();
      this.getCurrentPageData();
    }
  }

  matchSearchText(casa: any, searchText: string): boolean {
    return (
      casa.report_date.toLowerCase().includes(searchText)
    );
  }

  // Método para obtener los datos de la página actual
  getCurrentPageData() {
    const startIndex = this.currentPage * this.pageSize; // Ajuste del cálculo del índice de inicio
    const endIndex = Math.min(
      startIndex + this.pageSize,
      this.filteredCasas.length
    );
    this.filteredCasas = this.filteredCasas.slice(startIndex, endIndex);
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
