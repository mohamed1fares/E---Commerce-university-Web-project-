import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { ProductService } from '../../core/services/product.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';  
import { CartService } from '../../core/services/cart.service';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { FilterService } from '../../core/services/filter.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports:[CurrencyPipe, FormsModule,CommonModule,RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  private fullProducts: Product[] = [];
  searchText: string = '';
  private sub?: Subscription;

  constructor(
    private productService: ProductService,
    private _cart: CartService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.sub = combineLatest([
      this.productService.getProducts(),
      this.filterService.filter$
    ]).subscribe({
      next: ([data, filter]) => {
        // Explicit typing
        const arr: Product[] = Array.isArray(data)
          ? (data as Product[])
          : ((data as any)?.data as Product[]) ?? [];
    
        this.fullProducts = arr.filter((p: Product) => !p.isDeleted);
    
        // فلترة بالكاتيجوري والساب كاتيجوري
        this.products = this.fullProducts.filter((p: Product) => {
          const matchCat = filter.category ? p.category?._id === filter.category : true;
          const matchSub = filter.subcategory ? p.subCategory?._id === filter.subcategory : true;
          return matchCat && matchSub;
        });
    
        // فلترة بالـ search
        if (this.searchText.trim()) {
          const search = this.searchText.toLowerCase();
          this.products = this.products.filter((p: Product) =>
            p.name?.toLowerCase().includes(search) || 
            p.description?.toLowerCase().includes(search)
          );
        }
      }
    });
    
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onSearchChange() {
    // هنا مش محتاج تعمل حاجة إضافية، 
    // لأن الفلترة كلها بتتعامل في الـ subscribe فوق
    // مجرد تعمل trigger للـ subscribe
    const search = this.searchText.toLowerCase();
    this.products = this.fullProducts.filter(p =>
      !p.isDeleted &&
      (p.name?.toLowerCase().includes(search) || p.description?.toLowerCase().includes(search))
    );
  }

  showMessage: boolean = false;
  messageText: string = '';
  success: boolean = false;
  addToCart(id: string) {
    this._cart.addToCart(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.messageText = 'Product added to cart!';
        this.success = true;
        this.showMessage = true;
        setTimeout(() => this.showMessage = false, 2500);
      },
      error: (err) => {
        console.error(err);
        this.messageText = 'Failed to add product.';
        this.success = false;
        this.showMessage = true;
        setTimeout(() => this.showMessage = false, 2500);
      }
    });
  }
}
