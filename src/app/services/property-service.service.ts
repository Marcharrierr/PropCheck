import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Provider } from '../interfaces/property_service.interface';

@Injectable({
  providedIn: 'root'
})
export class PropertyServiceService {

  constructor(private http: HttpClient) { }

  private readonly baseUrl: string = environment.baseUrl;

  API_URL: string = 'http://localhost:3000/api'



  getServiceProperties(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/service-propertys`);
  }



}
