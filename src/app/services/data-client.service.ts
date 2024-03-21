import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataClient {
  private baseUrl: string = 'https://api.propcheck.ai/propcheck/client';

  constructor(private http: HttpClient) { }
  
  getClientId(): string | null {
    const agentDataString = localStorage.getItem('agentData');
    
    if (agentDataString) {
      const agentData = JSON.parse(agentDataString);
      return agentData.id;
    } else {
      return null;
    }
  }
  
  getClient(): Observable<any> {
    const id = this.getClientId();
    
    if (id) {
      const url = `${this.baseUrl}/${id}`;
      return this.http.get(url);
    } else {
      return new Observable();
    }
  }
}