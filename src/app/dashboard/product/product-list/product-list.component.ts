import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
// import { Product } from '../../../core/models/models';
import { RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { EditProductModalComponent } from '../edit-product-modal/edit-product-modal.component';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink, CommonModule, EditProductModalComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  editingProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (res) => (this.products = res,console.log(res)
      ),
      error: (err) => console.error('Load products error:', err)
    });
  }

  openEditProduct(product: Product) {
    this.editingProduct = product;
  }

  onProductUpdated(formData: FormData) {
    if (!this.editingProduct) return;
  
    this.productService.updateProduct(this.editingProduct._id, formData).subscribe({
      next: (updatedProduct) => {
        this.products = this.products.map(p =>
          p._id === updatedProduct._id ? updatedProduct : p
        );
  
        this.editingProduct = null;
      },
      error: (err) => {
        console.error('Update error:', err);
        alert('Failed to update product');
        this.editingProduct = null;
      }
    });
  }
  

  deleltedproduct(id: string) {
    this.productService.softDeletedProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter((p) => p._id !== id);
      },
      error: (err) => console.error('Delete error:', err)
    });
  }
}