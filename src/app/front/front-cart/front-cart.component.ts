import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../core/services/order.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-front-cart',
  imports: [CommonModule,FormsModule],
  templateUrl: './front-cart.component.html',
  styleUrl: './front-cart.component.css',
})
export class FrontCartComponent implements OnInit {
  cart: any = { items: [], totalPrice: 0 };
  loading = false;
  error = '';

  constructor(private cartService: CartService ,private _data:ProductService) {}

  ngOnInit() {
    this.loadCart();
    console.log(this._data.getProducts);
    
  }

  loadCart() {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cart = res.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error.message;
        this.loading = false;
      }
    });
  }

  updateQuantity(itemId: string, qty: string | number) {
    const quantity = Number(qty); // نتأكد إنه رقم
    if (quantity > 0) {
      this.cartService.updateCartItem(itemId, quantity).subscribe(() => this.loadCart());
    }
  }
  

  removeItem(itemId: string) {
    this.cartService.removeCartItem(itemId).subscribe(() => this.loadCart());
  }

  clearCart() {
    this.cartService.clearCart().subscribe(() => this.loadCart());
  }

  checkout() {
    this.cartService.checkout().subscribe({
      next: (res) => {
        alert('Checkout successful!');
        this.loadCart();
      },
      error: (err) => alert(err.error.message)
    });
  }
}