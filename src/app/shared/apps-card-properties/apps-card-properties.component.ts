import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-apps-card-properties',
  templateUrl: './apps-card-properties.component.html',
  styleUrls: ['./apps-card-properties.component.css']
})
export class AppsCardPropertiesComponent {
  @Input() casas: any[] = [];

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
}
