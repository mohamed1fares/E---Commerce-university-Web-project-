import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
// import {  User } from '../models/models';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Auth, User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.apiUrl+'users/login';
  constructor(private _http: HttpClient) {}
  

  login(data: { email: string; password: string }): Observable<Auth> {
    return this._http.post<Auth>(this.url, data).pipe(
      tap((res) => {
        if (res && res.token) {
          localStorage.setItem('token', res.token);
        }
      })
    );
  }

  signup(data: User): Observable<any> {
    return this._http.post(environment.apiUrl+'users', data);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decode = jwtDecode<any>(token);
      return decode.role || null;
    } else {
      return null;
    }
  }

  isLogin(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
  }


  editUser(data : any| User,_id:string):Observable<any>{
    // /users/:id
    return this._http.put(environment.apiUrl+`users/users/`+_id,data)
  }


  // getUserById(id :string): Observable<any>{
  //   return this._http.get(`${this.url}/${id}`)
  // }


}

















