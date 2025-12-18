import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { About } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor(private _http: HttpClient) {}

  url =environment.apiUrl+ 'about';

  getAbout(): Observable<{ data: About[] }> {
    return this._http.get<{ data: About[] }>(this.url);
  }

  updateAbout(data: { title: string; facebookLink: string }): Observable<any> {
    return this._http.post(this.url, data);
  }
}
