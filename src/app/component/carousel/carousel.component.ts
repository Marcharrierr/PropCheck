import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {

  images: string[] = [
    'assets/empresas/ProRenta.jpeg',
    'assets/empresas/AsciendeYa.svg',
    'assets/empresas/Cumbres.jpeg',
    'assets/empresas/Rentando.jpeg',
  ];
  name: string[] = [
    'ProRenta',
    'Asciende YA!',
    'Cumbres Gestión Inmobiliaria',
    'Rentando'
  ]

  getImageName(imageUrl: string): string {
    const imageName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    return imageName;
  }

}
