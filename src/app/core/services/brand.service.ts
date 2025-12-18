import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Brand } from '../models/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Brand } from '../models/brand.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private baseUrl = environment.apiUrl+'brand';

  constructor(private http: HttpClient) {}

  createBrand(data: { name: string }) {
    return this.http.post(`${this.baseUrl}`, data);
  }

  getBrands(): Observable<Brand[]> {
    return this.http.get<{ message: string; data: Brand[] }>(this.baseUrl).pipe(
      map(res => res.data)
    );
  }

  deleteBrand(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


  reStoreBrand(id:string){
    return this.http.delete(`${this.baseUrl}/restore/${id}`);
  }
}
