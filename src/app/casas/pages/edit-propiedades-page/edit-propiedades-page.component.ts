import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-casas-page',
  templateUrl: './edit-propiedades-page.component.html',
  styles: [
  ]
})
export class EditPropiedadesPageComponent implements OnInit {


  comunidad: string | undefined;
  direccion: string | undefined;
  luz: string | undefined;
  agua: number | undefined;
  gas: number | undefined;
  gc: string | undefined;
  aseo: string | undefined;
  contri: string | undefined;



  ngOnInit(): void {
    this.comunidad = 'Comunidad Amanecer';
    this.direccion = "Merced 691 - DPTO 1011 - Santiago centro";
    this.luz = "";
    this.agua = 1685292;
    this.gas = 900507703;
    this.gc = "Comunidad Feliz";
    this.aseo = "";
    this.contri = "Rol no existe";



  }






}
