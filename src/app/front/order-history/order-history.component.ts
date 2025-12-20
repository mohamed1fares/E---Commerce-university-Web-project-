import { Component, OnInit } from '@angular/core';
// import { Order } from '../../core/models/models';
import { OrderService } from '../../core/services/order.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Order } from '../../core/models/product.model';

@Component({
  selector: 'app-order-history',
  imports: [FormsModule,CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'

})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  error = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getUserOrders().subscribe({
      next: (res) => {
        this.orders = res.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load orders';
        this.loading = false;
      }
    });
  }
}