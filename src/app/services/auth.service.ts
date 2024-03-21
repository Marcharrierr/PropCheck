import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal, computed } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError, from } from 'rxjs';
import { environment } from '../../environments/environments';
import { DataAgent } from './data-agent.service';
import { DataClient } from './data-client.service';
import { Router } from '@angular/router';

import { mergeMap } from 'rxjs/operators';


import {
  AuthStatus,
  User,
  LoginResponse,
  CheckTokenResponse,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient); //injectando cliente http
  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //Nadie fuera del servicio cambia el estado de autenticación, por hacerla privada con el _
  public authStatus = computed(() => this._authStatus());
  public currentUser = computed(() => this._currentUser());
  // verificar estado de autenticacion
  constructor(
    private dataAgent: DataAgent,
    private dataClient: DataClient,
    private router: Router
  ) {
    // constructor(private dataAgent: DataAgent) {
    this.checkOutStatus().subscribe();
  }

  //Reutilizando código
  private setAuthentication(user: User, token: string, id: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    localStorage.setItem('id', id.toString());
    return true;
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/propcheck/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      mergeMap(({ user, token, id }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('id', id.toString());

        return this.dataAgent.getAgent().pipe(
          mergeMap((agentData) => {
            localStorage.setItem('agentData', JSON.stringify(agentData));
            console.log('AGENTE');
            console.log(agentData);

            // Llamar para obtener datos del cliente
            return this.dataClient.getClient().pipe(
              tap((clientData) => {
                localStorage.setItem('clientData', JSON.stringify(clientData));
                console.log('CLIENTE');
                console.log(clientData);

                // Establecer la autenticación
                this.setAuthentication(user, token, id.toString());

                // Redirigir a la página de propiedades
                this.router.navigate(['/propiedades/list']);
              }),
              catchError((error) => {
                console.error('Error al obtener datos del cliente:', error);
                return throwError(error);
              })
            );
          }),
          catchError((error) => {
            console.error('Error al obtener datos del agente:', error);
            return throwError(error);
          })
        );
      }),
      map(() => true),
      catchError((err) => throwError(err.error.message))
    );
  }


  //Ver estatus de token
  checkOutStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.removeItem('token');
      this.logout();
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CheckTokenResponse>(url, { headers }).pipe(
      map(({ user, token }) => this.setAuthentication(user, token, '')),
      catchError(() => {
        this._authStatus.set(AuthStatus.notAuthenticated);
        return of(false);
      })
    );
  }
  // cerrar sesion
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('agentData');
    // localStorage.removeItem('clientData');

    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }
}
