import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecoverPassService {

  private readonly baseUrl: String = environment.baseUrld;

  private http = inject(HttpClient); //inject cliente http

  constructor() { }

  sendMail(to: string): Observable<any> {
    const url = `${this.baseUrl}/send-email`;
    return this.http.post(url, { to }, { withCredentials: true });
  }


}

