import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-apps-card-properties',
  templateUrl: './apps-card-properties.component.html',
  styleUrls: ['./apps-card-properties.component.css'],
  providers: [MessageService],
})
export class AppsCardPropertiesComponent {
  constructor(
    private router: Router,
    private propertyService: PropertyService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  newProperties: any
  deleteproperty: any;
  @Input() status: 'success' | 'error' | 'loading' = 'loading';
  @Input() casas: any[] = [];
  iconos = [
    { ruta: 'assets/img/rayoo.svg' },
    { ruta: 'assets/img/aguaa.svg' },
    { ruta: 'assets/img/fuegoo.svg' },
    { ruta: 'assets/img/recicla.svg' },
    { ruta: 'assets/img/property.svg' },
    { ruta: 'assets/img/casaa.svg' },
  ];
  ngOnChanges(changes: SimpleChanges) {
    if (changes['casas']) {
      const newValue = changes['casas'].currentValue;
      if (Array.isArray(newValue)) {
        this.casas = newValue; // Asignar el nuevo valor solo si es un array
      }
    }
  }

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

  showConfirm(idProperty: any) {
    this.messageService.clear();
    this.messageService.add({
      key: 'c',
      sticky: true,
      severity: 'warn',
      summary: 'Eliminar propiedad',
      detail: '¿Estás seguro que quieres eliminar esta propiedad?',
    });
    this.idPropertyToDelete = idProperty;
    this.deleteproperty = this.casas.filter(item => item.id == this.idPropertyToDelete )[0]
    console.log('this.deleteproperty', this.deleteproperty)
  }
  onConfirm() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Propiedad eliminada'});
    this.deleteProperty(this.idPropertyToDelete)
    this.messageService.clear('c');
  }
  onReject() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'No fue eliminada la propiedad'});
    this.messageService.clear('c');
  }
  // Función para eliminar la propiedad
  deleteProperty(idProperty: any) {
    try {
      this.propertyService.deleteProperty(idProperty).subscribe(
        (properties) => {
          const index = this.casas.findIndex((casa) => casa.id === idProperty);
          console.log('index', index)
          // Si se encontró la casa, eliminarla del array
          if (index !== -1) {
            this.casas.splice(index, 1);
            // Asigna el array actualizado a uno nuevo para que Angular detecte el cambio y actualice la vista
            this.casas = [...this.casas];
            this.newProperties =[...this.casas]
            console.log('this.casas', this.casas)
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {}
  }
}
