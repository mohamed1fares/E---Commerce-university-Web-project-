import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = environment.apiUrl +'cart'; // عدّل المسار حسب عندك

  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  addToCart(productId: string, quantity: number = 1): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { product: productId, quantity });
  }

  updateCartItem(itemId: string, quantity: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/item/${itemId}`, { quantity });
  }

  removeCartItem(itemId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/item/${itemId}`);
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.apiUrl}`);
  }

  checkout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout`, {});
  }
}