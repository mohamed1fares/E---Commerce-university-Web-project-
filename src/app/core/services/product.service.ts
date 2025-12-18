import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Product } from '../models/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) {}

  url = environment.apiUrl +'products';

  addProduct(productData: FormData): Observable<any> {
    return this._http.post(this.url, productData);
  }

  getProducts(): Observable<Product[]> {
    return this._http.get<{ message: string; data: Product[] }>(this.url).pipe(
      map(res => res.data)
    );
  }

  updateProduct(id: string, formData: FormData): Observable<Product> {
    return this._http.put<{ message: string, data: Product }>(`${this.url}/${id}`, formData)
      .pipe(
        map(res => res.data) 
      );
  }
  
  
  

  softDeletedProduct(id: string): Observable<any> {
    return this._http.delete(`${this.url}/${id}`);
  }
  
  restoreProduct(id: string): Observable<any> {
    return this._http.delete(`${this.url}/restore/${id}`);
  }

  getProductByRoute(route: string): Observable<Product> {
    return this._http.get<{ data: Product }>(`${this.url}/${route}`).pipe(map(res => res.data));
  }
  
  getRelatedProducts(subCategoryId: string): Observable<Product[]> {
    return this._http.get<{ data: Product[] }>(`${this.url}/related/${subCategoryId}`)
      .pipe(map(res => res.data));
  }
  


}
