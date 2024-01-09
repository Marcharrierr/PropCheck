import { Injectable, Signal, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environments';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private readonly baseUrl: string = environment.baseUrl;

  private http = inject(HttpClient); //injectando cliente http
  //private _currentUser = signal<User | null>(null)

  constructor() { }

  /*private setAutentication(user:User, token:string):boolean{

    this._currentUser.set(user)
    localStorage.setItem('token', token)
    return true;
  }*/

  registrar(rut: string, name: string, lastName: string, email: string,
    password: string, rutEmpresa: string): Observable<any> {

    const url = `${this.baseUrl}/users/register`;

    const body = { rut, name, lastName, email, password, rutEmpresa };

    return this.http.post(url, body);

  }


}
