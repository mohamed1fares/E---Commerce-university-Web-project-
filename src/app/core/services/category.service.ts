import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category-sub.model';
import { environment } from '../../../environments/environment';
// import { Category } from '../models/category&sub.model';
// import { Category } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _http: HttpClient) {}

  url = environment.apiUrl +'category';

  getCategory(): Observable<{ message: string; data: Category[] }> {
    return this._http.get<{ message: string; data: Category[] }>(this.url);
  }

  // الباك يستقبل "category"
  addCategory(category: { category: string }): Observable<Category> {
    return this._http.post<Category>(this.url, category);
  }

  softDeletedCategory(id:any): Observable<any>{
  return this._http.delete(`${this.url}/${id}`) 
  }

  restoreDeletedCategory(id :string):Observable<any>{
    return this._http.delete(`${this.url}/restore/${id}`)    
  }
}
