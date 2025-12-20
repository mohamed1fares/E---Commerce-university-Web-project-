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
  imports:[CurrencyPipe, FormsModule, CommonModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit, OnDestroy {
  // المصفوفات
  fullProducts: Product[] = [];      
  filteredProducts: Product[] = [];  
  pagedProducts: Product[] = [];     

  // متغيرات الحالة
  loading: boolean = true; // 👈 ضفنا المتغير ده هنا عشان يحل المشكلة
  currentPage: number = 1;
  itemsPerPage: number = 8;
  
  searchText: string = '';
  private sub?: Subscription;

  // متغيرات التنبيه (Toast)
  showMessage: boolean = false;
  messageText: string = '';
  success: boolean = false;

  constructor(
    private productService: ProductService,
    private _cart: CartService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.loading = true; // نبدأ عملية التحميل
    this.sub = combineLatest([
      this.productService.getProducts(),
      this.filterService.filter$
    ]).subscribe({
      next: ([data, filter]) => {
        const arr: Product[] = Array.isArray(data)
          ? (data as Product[])
          : ((data as any)?.data as Product[]) ?? [];
    
        this.fullProducts = arr.filter((p: Product) => !p.isDeleted);
        this.applyFilters(filter);
        this.loading = false; // 👈 نقفل التحميل بعد ما الداتا توصل
      },
      error: (err) => {
        console.error(err);
        this.loading = false; // نقفل التحميل حتى لو حصل خطأ
      }
    });
  }

  applyFilters(filter: any) {
    let results = this.fullProducts.filter((p: Product) => {
      const matchCat = filter.category ? p.category?._id === filter.category : true;
      const matchSub = filter.subcategory ? p.subCategory?._id === filter.subcategory : true;
      return matchCat && matchSub;
    });

    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();
      results = results.filter((p: Product) =>
        p.name?.toLowerCase().includes(search) || 
        p.description?.toLowerCase().includes(search)
      );
    }

    this.filteredProducts = results;
    this.currentPage = 1; 
    this.updateDisplay();
  }

  updateDisplay() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplay();
      window.scrollTo(0, 0);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplay();
      window.scrollTo(0, 0);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  onSearchChange() {
    this.filterService.filter$.subscribe(f => this.applyFilters(f)).unsubscribe();
  }

  addToCart(id: string) {
    this._cart.addToCart(id).subscribe({
      next: (res: any) => {
        this.messageText = 'Product added to cart!';
        this.success = true;
        this.showMessage = true;
        setTimeout(() => this.showMessage = false, 2500);
      },
      error: (err) => {
        this.messageText = 'Failed to add product.';
        this.success = false;
        this.showMessage = true;
        setTimeout(() => this.showMessage = false, 2500);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}