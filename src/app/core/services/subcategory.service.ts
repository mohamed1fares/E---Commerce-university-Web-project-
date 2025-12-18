import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Subcategory } from '../models/category-sub.model';
import { environment } from '../../../environments/environment';
// import { Subcategory } from '../models/category&sub.model';
// import { Subcategory } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
  constructor(private _http: HttpClient) {}

  url = environment.apiUrl +'subcategory';

  getSubcategory(): Observable<Subcategory[]> {
    return this._http
      .get<{ message: string; data: Subcategory[] }>(this.url)
      .pipe(map((res) => res.data));
  }

  createSubcategory(data: any): Observable<any> {
    return this._http.post(`${this.url}`, data);
  }

  deleteSubcategory(id: string): Observable<any> {
    return this._http.delete(`${this.url}/${id}`);
  }

  getDeletedSubcategories(): Observable<Subcategory[]> {
    return this._http
      .get<{ message: string; data: Subcategory[] }>(`${this.url}/all-deleted`)
      .pipe(map((response) => response.data));
  }

  restoreDeletedSubcategory(id :string):Observable<any>{
    return this._http.delete(`${this.url}/restore/${id}`)    
  }
}
