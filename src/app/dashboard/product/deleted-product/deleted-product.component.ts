import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import {  Subcategory } from '../../../core/models/models';
import { SubcategoryService } from '../../../core/services/subcategory.service';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-deleted-product',
  imports: [FormsModule,CommonModule],
  templateUrl: './deleted-product.component.html',
  styleUrl: './deleted-product.component.css'
})
export class DeletedProductComponent implements OnInit {
  products: Product[] = [];
  editingProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => (this.products = data,console.log(data)),
      error: (err) => console.error('Error fetching products', err),
    });
  }


  onProductUpdated(formData: FormData) {
    if (!this.editingProduct) return;
  
    this.productService.updateProduct(this.editingProduct._id, formData).subscribe({
      next: (saved) => {
        const idx = this.products.findIndex(p => p._id === saved._id);
        if (idx > -1) this.products[idx] = saved;
        this.editingProduct = null; // يقفل المودال بعد الحفظ
      },
      error: (err) => {
        console.error('Failed to update product', err);
        alert('Failed to update product');
        this.editingProduct = null;
      }
    });
  }
  


  RestoreProduct(id:string){
    this.productService.restoreProduct(id).subscribe({
      next: ()=>{
        this.products= this.products.filter((sub)=>sub._id!==id)
      },
      error:(err)=>console.error('Delete error:', err),
    })
  }


}
