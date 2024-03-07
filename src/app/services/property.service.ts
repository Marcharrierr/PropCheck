import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, catchError, of, throwError } from 'rxjs';
import { environment } from '../../environments/environments';
import { Property } from '../interfaces/property.interface';
import { Municipality, PropertyServices, Region, Type } from '../interfaces/property_service.interface';
import { ApiResponse } from '../interfaces/dbtsSummary.dto';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private readonly baseUrl: string = environment.baseUrl;

  private _type: Type[] = [Type.casa, Type.departamento, Type.estacionamiento, Type.galpon, Type.local]
  private _region: Region[] = [Region.coquimbo, Region.santiago]
  private _municipality: Municipality[] = [
    Municipality.buin,
    Municipality.conchali,
    Municipality.elBosque,
    Municipality.estacionCentral,
    Municipality.independencia,
    Municipality.laCisterna,
    Municipality.laFlorida,
    Municipality.laGranja,
    Municipality.laSerena,
    Municipality.laReina,
    Municipality.lasCondes,
    Municipality.macul,
    Municipality.maipu,
    Municipality.nunoa,
    Municipality.providencia,
    Municipality.pudahuel,
    Municipality.quintaNormal,
    Municipality.renca,
    Municipality.sanMiguel,
    Municipality.sanJoaquin,
    Municipality.santiago,
    Municipality.vitacura
  ]




  constructor(
    private http: HttpClient
  ) { }

  get type(): Type[] {
    return [... this._type]
  }

  get region(): Region[] {
    return [... this._region]
  }


  get municipality(): Municipality[] {
    return [... this._municipality]
  }




  getPropertiesByClientId(clientId: number): Observable<Property[]> {
    return this.http.get<Property[]>(`http://34.173.203.168:3500/propcheck/client/3/property`);
  }
  getPropertiesdebt(clientId: number): Observable<any> {
    return this.http.get<any>(`http://34.173.203.168:3500/propcheck/client/4/debts-summary`).pipe(
      catchError(error => {
        console.log(error);
        return throwError('Error fetching data');
      })
    );
  }


  getPropertiesById(id: number): Observable<Property[]> {
    return this.http.get<Property[]>(`http://localhost:3000/api/propertys/id/${id}`);
  }

  getPropertyServiceById(id: number): Observable<PropertyServices[]> {
    return this.http.get<PropertyServices[]>(`http://localhost:3000/api/property-service/${id}`);
  }



  deleteProperty(id: number) {

  }
}
