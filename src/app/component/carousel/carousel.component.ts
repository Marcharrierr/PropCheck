import { Component } from '@angular/core';

interface CarouselItem {
  imageUrl: string;
  name: string;
  url: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  images: CarouselItem[] = [
    { 
      imageUrl: 'assets/empresas/ProRenta.jpeg', 
      name: 'ProRenta', 
      url: '#'
    },
    { 
      imageUrl: 'assets/empresas/AsciendeYa.jpeg', 
      name: 'Asciende YA!', 
      url: '#'
    },
    { 
      imageUrl: 'assets/empresas/Cumbres.jpeg', 
      name: 'Cumbres Gestión Inmobiliaria', 
      url: '#'
    },
    { 
      imageUrl: 'assets/empresas/Rentando.jpeg', 
      name: 'Rentando', 
      url: '#'
    }
  ];

  openUrlInNewTab(event: MouseEvent, url: string): void {
    event.preventDefault();
    window.open(url, '_blank');
  }
}
