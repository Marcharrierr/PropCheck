import { Component } from '@angular/core';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent {
  selectedCity: any;

  detailCuentas = [
    {
      "icono": "assets/img/llama.svg",
      "nombre": "Luz",
      "cuenta": "ESVAL-2634688-6",
      "deuda_actual": "$0",
      "deuda_anterior": "$0",
      "fecha_vencimiento": "AL DIA",
      "ultimo_pago": "$0"
    },
    {
      "icono": "assets/img/llama.svg",
      "nombre": "Gas",
      "cuenta": "ESVAL-2634688-7",
      "deuda_actual": "$20",
      "deuda_anterior": "$10",
      "fecha_vencimiento": "30/03/2024",
      "ultimo_pago": "$5"
    },
    {
      "icono": "assets/img/llama.svg",
      "nombre": "Agua",
      "cuenta": "ESVAL-2634688-8",
      "deuda_actual": "$15",
      "deuda_anterior": "$5",
      "fecha_vencimiento": "25/03/2024",
      "ultimo_pago": "$10"
    },
    {
      "icono": "assets/img/llama.svg",
      "nombre": "Internet",
      "cuenta": "ESVAL-2634688-9",
      "deuda_actual": "$30",
      "deuda_anterior": "$25",
      "fecha_vencimiento": "10/04/2024",
      "ultimo_pago": "$20"
    },
    {
      "icono": "assets/img/llama.svg",
      "nombre": "Internet",
      "cuenta": "ESVAL-2634688-9",
      "deuda_actual": "$30",
      "deuda_anterior": "$25",
      "fecha_vencimiento": "10/04/2024",
      "ultimo_pago": "$20"
    },
    {
      "icono": "assets/img/llama.svg",
      "nombre": "Internet",
      "cuenta": "ESVAL-2634688-9",
      "deuda_actual": "$30",
      "deuda_anterior": "$25",
      "fecha_vencimiento": "10/04/2024",
      "ultimo_pago": "$20"
    }
  ]



}
