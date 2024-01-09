import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environments';
import { Property, PropertyService } from '../interfaces/property.interface';

@Injectable({
  providedIn: 'root'
})
export class CreateServiceService {
  private readonly baseUrl: string = environment.baseUrl;
  private propertyServices: PropertyService[] = [];

  constructor(private http: HttpClient) { }

  private property_id: number | null = null;


  crearProperty(datosFormulario: any): Observable<any> {
    const url = 'http://localhost:3000/api/propertys/';
    const datosPropiedad = {
      "community_rut": 1,
      "community_dv": "9",
      "community_name": datosFormulario.community_name,
      "type": datosFormulario.type,
      "region": datosFormulario.region,
      "municipality": datosFormulario.municipality,
      "address": datosFormulario.address,
      "tower": datosFormulario.tower,
      "department": datosFormulario.department,
      "status": "Activo",
      "client_id": Number(localStorage.getItem('id'))
    };
    console.log(datosPropiedad)
    return this.http.post<any>(url, datosPropiedad)
      .pipe(
        switchMap((response: any) => {
          console.log("property_id service: ", response)
          // Establece el property_id
          this.setPropertyId(response);
          return of(this.getPropertyId());
        }),
        catchError(err => {
          return throwError(() => err.error);
        })
      );
  }

  setPropertyId(id: number) {
    this.property_id = id;
  }

  getPropertyId(): number | null {
    return this.property_id;
  }


  createPropertyService(propertyServiceData: any): Observable<any> {
    if (!this.property_id) {
      throw new Error('No se ha establecido el property_d');
    }

    // const formattedData = propertyServiceData.services.map((service: any) => {
    //   let serviceId;
    //   switch (service.key) {
    //     case 'luz':
    //       serviceId = service['luzId'] ? service['luzId'] : undefined;
    //       break;
    //     case 'agua':
    //       serviceId = service['aguaId'] ? service['aguaId'] : undefined;
    //       break;
    //     case 'gas':
    //       serviceId = service['gasId'] ? service['gasId'] : undefined;
    //       break;
    //     case 'gc':
    //       serviceId = service['gcId'] ? service['gcId'] : undefined;
    //       break;
    //     case 'contri':
    //       serviceId = 14;
    //       break;
    //     case 'aseo':
    //       serviceId = 13;
    //       break;
    //     default:
    //       serviceId = undefined;
    //   }

    //   return {
    //     "property_id": this.property_id,
    //     "service_id": serviceId,
    //     "service_client_id": service.value,
    //     "created": new Date().toISOString(),
    //     "modified": new Date().toISOString()
    //   };
    // });

    // console.log(' Service : ', formattedData);

    return this.http.post(`http://localhost:3000/api/propertys/${this.property_id}/services`, propertyServiceData)
      .pipe(
        tap(response => console.log('Respuesta de la API:', response)),
        catchError(err => {
          console.error('Error al crear el servicio de propiedad:', err);
          return throwError(() => err.error);
        })
      );
  }






}
