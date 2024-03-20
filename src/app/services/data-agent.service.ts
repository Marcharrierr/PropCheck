import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataAgent {
  private baseUrl: string = 'https://api.propcheck.ai/propcheck/agent';

  constructor(private http: HttpClient) { }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getId(): string | null {
    return localStorage.getItem('id');
  }
  getAgent(): Observable<any> {
    const id = this.getId();
    if (id) {
      const url = `${this.baseUrl}/${id}`;
      return this.http.get(url);
    } else {
      return new Observable();
    }
  }
}
