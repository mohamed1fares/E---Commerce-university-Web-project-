import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Order } from '../../../core/models/models';
import { OrderService } from '../../../core/services/order.service';
import { finalize, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Order } from '../../../core/models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  groupedOrders: any[] = []; // هنا هنجمع الأوردرات per user
  loading = false;
  error: string | null = null;

  // modal / detail
  selectedGroup: any | null = null;
  detailLoading = false;

  // pagination بسيطة
  page = 1;
  limit = 20;
  total = 0;

  // الحالات المسموح بها
  statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'];

  private subs: Subscription[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  loadOrders(page = this.page): void {
    this.loading = true;
    this.error = null;
    const sub = this.orderService.getOrders(page, this.limit)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: res => {
          let fetchedOrders: Order[] = [];

          if (res && res.data) {
            fetchedOrders = res.data;
            this.total = res.total ?? fetchedOrders.length;
            this.page = res.page ?? page;
            this.limit = res.limit ?? this.limit;
          } else if (Array.isArray(res)) {
            fetchedOrders = res;
            this.total = fetchedOrders.length;
          } else {
            fetchedOrders = [];
            this.total = 0;
          }

          this.orders = fetchedOrders;
          this.groupOrdersByUser();
        },
        error: err => {
          console.error(err);
          this.error = err?.error?.message ?? err.message ?? 'Failed to load orders';
        }
      });
    this.subs.push(sub);
  }

  // grouping function
  private groupOrdersByUser() {
    const grouped: any = {};

    this.orders.forEach(order => {
      const userId = order.user?._id || order.user?.email || 'unknown';
      if (!grouped[userId]) {
        grouped[userId] = {
          user: order.user,
          orders: [],
          total: 0
        };
      }
      grouped[userId].orders.push(order);
      grouped[userId].total += order.total || 0;
    });

    this.groupedOrders = Object.values(grouped);
  }

  // modal
  viewUserOrders(group: any) {
    this.selectedGroup = group;
  }

  closeDetail() {
    this.selectedGroup = null;
  }

  // تغيير حالة order واحدة
  changeStatus(order: Order, newStatus: string) {
    const oldStatus = order.status;
    order.status = newStatus as Order['status'];
  
    const sub = this.orderService.updateStatus(order._id, newStatus)
      .subscribe({
        next: updated => {
          // ✅ لو رجع سيرفر بقيمة جديدة نحدّثها
          const group = this.groupedOrders.find(g => g.user._id === updated.user._id);
          if (group) {
            const idx = group.orders.findIndex((o: Order) => o._id === updated._id);
            if (idx > -1) group.orders[idx] = updated;
          }
          if (this.selectedGroup) {
            const idx = this.selectedGroup.orders.findIndex((o: Order) => o._id === updated._id);
            if (idx > -1) this.selectedGroup.orders[idx] = updated;
          }
        },
        error: err => {
          console.error(err);
          alert('❌ Failed to update status');
          order.status = oldStatus; // ❌ رجّع القديم لو فشل
        }
      });
  
    this.subs.push(sub);
  }
  

  // حذف order واحدة
  deleteOrder(order: Order) {
    if (!confirm(`حذف الأوردر ${order._id} نهائياً؟`)) return;
    const sub = this.orderService.deleteOrder(order._id).subscribe({
      next: _ => {
        this.orders = this.orders.filter(o => o._id !== order._id);
        if (this.selectedGroup) {
          this.selectedGroup.orders = this.selectedGroup.orders.filter((o: Order) => o._id !== order._id);
          this.selectedGroup.total = this.selectedGroup.orders.reduce((sum: number, o: Order) => sum + (o.total || 0), 0);
        }
        this.groupOrdersByUser();
        alert('Order deleted');
      },
      error: err => {
        console.error(err);
        alert('Failed to delete order');
      }
    });
    this.subs.push(sub);
  }

  // pagination handlers (بسيطة)
  prevPage() {
    if (this.page <= 1) return;
    this.page--;
    this.loadOrders(this.page);
  }
  nextPage() {
    if (this.page * this.limit >= this.total) return;
    this.page++;
    this.loadOrders(this.page);
  }
}
