import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/product.model';
import { environment } from '../../../environments/environment';
// import { Order } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = environment.apiUrl +'order'; // عدّل الـ URL حسب الـ backend

  constructor(private http: HttpClient) {}

  // ✅ Get all orders (Admin)
  getOrders(page?: number, limit?: number): Observable<any> {
    let url = this.apiUrl;
    if (page && limit) {
      url += `?page=${page}&limit=${limit}`;
    }
    return this.http.get<any>(url);
  }

  // ✅ Get order by ID
  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  // ✅ Create order (User)
  createOrder(orderData: Partial<Order>): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, orderData);
  }

  // ✅ Update order fully
  updateOrder(id: string, orderData: Partial<Order>): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${id}`, orderData);
  }

  // ✅ Update only status
  updateStatus(id: string, status: string): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/${id}/status`, { status });
  }

  // ✅ Delete order
  deleteOrder(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // ✅ Get orders for logged-in user
  getUserOrders(): Observable<{ data: Order[] }> {
    return this.http.get<{ data: Order[] }>(`${this.apiUrl}/user`);
  }
}