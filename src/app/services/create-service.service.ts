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
    const url = `${this.baseUrl}/propcheck/property/`;

    const clientDataString = localStorage.getItem('clientData');
    const clientData = clientDataString ? JSON.parse(clientDataString) : null;

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
      "client_id": clientData.id,
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
      throw new Error('No se ha establecido el property_id');
    }


    return this.http.post(`${this.baseUrl}/propcheck/property/${this.property_id}/service`, propertyServiceData)
      .pipe(
        tap(response => console.log('Respuesta de la API:', response)),
        catchError(err => {
          console.error('Error al crear el servicio de propiedad:', err);
          return throwError(() => err.error);
        })
      );
  }






}
