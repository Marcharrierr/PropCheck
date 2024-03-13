import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apps-card-properties',
  templateUrl: './apps-card-properties.component.html',
  styleUrls: ['./apps-card-properties.component.css']
})
export class AppsCardPropertiesComponent {
  constructor(private router: Router) {}

  @Input() casas: any[] = [];
  iconos = [
    { ruta: "assets/img/rayoo.svg" },
    { ruta: "assets/img/aguaa.svg" },
    { ruta: "assets/img/fuegoo.svg" },
    { ruta: "assets/img/recicla.svg" },
    { ruta: "assets/img/property.svg" },
    { ruta: "assets/img/casaa.svg" }
  ]
  descargarInforme(): void {
    const texto = "Aquí va el contenido de tu informe..."; // Contenido del informe

    // Crear un elemento <a> temporal para descargar el archivo
    const elemento = document.createElement('a');
    elemento.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(texto));
    elemento.setAttribute('download', 'informe.txt');

    // Simular clic en el enlace para iniciar la descarga
    elemento.style.display = 'none';
    document.body.appendChild(elemento);
    elemento.click();
    document.body.removeChild(elemento);
  }

  redirectToPropertyDetail(id: string) {
    localStorage.setItem('selectedProperty', JSON.stringify(this.casas.find(casa => casa.id === id)));

    this.router.navigate(['/propiedades/property-detail']);
  }
}
