import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal, computed } from '@angular/core';

import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

import { environment } from '../../environments/environments';

import { AuthStatus, User, LoginResponse, CheckTokenResponse } from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient); //injectando cliente http


  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);


  //Nadie fuera del servicio cambia el estado de autenticación, por hacerla privada con el _
  public authStatus = computed(() => this._authStatus())
  public currentUser = computed(() => this._currentUser());


  constructor() {
    this.checkOutStatus().subscribe();
  }

  //Reutilizando código
  private setAuthentication(user: User, token: string, id: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    localStorage.setItem('id', id.toString());

    return true
  }



  //Loguear a usuario
  login(email: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/propcheck/auth/login`;
    const body = { email, password };


    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({ user, token, id }) => this.setAuthentication(user, token, id.toString())),
        catchError(err => {
          return throwError(() => err.error.message)
        })
      );

  }



  //Ver estatus de token
  checkOutStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token')

    if (!token) {
      localStorage.removeItem('token');
      this.logout();

    }


    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token, '')),
        catchError(() => {
          this._authStatus.set(AuthStatus.notAuthenticated);

          return of(false)
        })
      );
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this._currentUser.set(null)
    this._authStatus.set(AuthStatus.notAuthenticated)
  }


}
