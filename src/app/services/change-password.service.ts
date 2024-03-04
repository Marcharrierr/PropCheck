import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  private apiUrl = 'https://nestsql-c6cnsk4xja-tl.a.run.app/api/users';
  private apiUrld = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  updatePassword(email: string, password: string) {
    const url = `${this.apiUrl}/${email}`;

    // Configuración de encabezados de la solicitud
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = JSON.stringify({ password })

    return this.http.patch(url, body, { headers });
  }


  verifyToken(token: string): Observable<{ success: boolean }> {
    const url = `${this.apiUrld}/verify-token`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = JSON.stringify({ token });

    return this.http.post<{ success: boolean }>(url, body, { headers });
  }

}
