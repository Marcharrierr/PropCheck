import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-apps-card-properties',
  templateUrl: './apps-card-properties.component.html',
  styleUrls: ['./apps-card-properties.component.css'],
})
export class AppsCardPropertiesComponent {
  constructor(
    private router: Router,
    private propertyService: PropertyService
  ) {}
  status: any;
  @Input() casas: any[] = [];
  iconos = [
    { ruta: 'assets/img/rayoo.svg' },
    { ruta: 'assets/img/aguaa.svg' },
    { ruta: 'assets/img/fuegoo.svg' },
    { ruta: 'assets/img/recicla.svg' },
    { ruta: 'assets/img/property.svg' },
    { ruta: 'assets/img/casaa.svg' },
  ];
  descargarInforme(): void {
    const texto = 'Aquí va el contenido de tu informe...'; // Contenido del informe

    // Crear un elemento <a> temporal para descargar el archivo
    const elemento = document.createElement('a');
    elemento.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(texto)
    );
    elemento.setAttribute('download', 'informe.txt');

    // Simular clic en el enlace para iniciar la descarga
    elemento.style.display = 'none';
    document.body.appendChild(elemento);
    elemento.click();
    document.body.removeChild(elemento);
  }

  redirectToPropertyDetail(id: string) {
    localStorage.setItem(
      'selectedProperty',
      JSON.stringify(this.casas.find((casa) => casa.id === id))
    );

    this.router.navigate(['/propiedades/property-detail', id]);
  }
  mostrar = false;
  idPropertyToDelete: any;
  @ViewChild('cd') confirmDialog: any;

  // Función para mostrar el diálogo de confirmación y establecer el id de la propiedad
  confirmDeleteProperty(idProperty: any) {
    this.mostrar = true;
    this.idPropertyToDelete = idProperty; // Almacena el id de la propiedad
  }

  // Función para manejar la confirmación o cancelación
  confirmDelete(confirm: boolean) {
    if (confirm) {
      // Si el usuario confirma, realizar la acción de eliminación
      this.deleteProperty(this.idPropertyToDelete);
    } else {
      // Si el usuario cancela, no hacer nada o manejar según sea necesario
    }
    this.mostrar = false; // Oculta el diálogo después de manejar la acción
  }

  // Función para eliminar la propiedad
  deleteProperty(idProperty: any) {
    try {
      this.propertyService.deleteProperty(idProperty).subscribe(
        (properties) => {
          this.casas = properties;
          console.log('delete',this.casas);
          const index = this.casas.findIndex(casa => casa.id === idProperty);

          // Si se encontró la casa, eliminarla del array
          if (index !== -1) {
            this.casas.splice(index, 1);
          }

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
