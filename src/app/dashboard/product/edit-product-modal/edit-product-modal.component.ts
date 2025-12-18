import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../core/models/product.model';
// import { Product } from '../../../core/models/models';

@Component({
  selector: 'app-edit-product-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-backdrop">
      <div class="modal">
        <h2>Edit Product</h2>
        <form (ngSubmit)="submit()">
          <label>Name</label>
          <input [(ngModel)]="editProduct.name" name="name" required />

          <label>Description</label>
          <textarea [(ngModel)]="editProduct.description" name="description" required></textarea>

          <label>Price</label>
          <input type="number" [(ngModel)]="editProduct.price" name="price" required min="0.01" />

          <label>Quantity</label>
          <input type="number" [(ngModel)]="editProduct.quantity" name="quantity" required min="1" />

          <label>Current Image</label>
          <img 
            *ngIf="editProduct.image"
            [src]="'http://localhost:3000/uploads/' + editProduct.image" 
            alt="{{ editProduct.name }}" 
            width="80"
          />

          <label>Change Image</label>
          <input type="file" (change)="onImageSelected($event)" />

          <label>Brand</label>
          <input [(ngModel)]="editProduct.brand.name" name="brand" readonly />

          <label>Category</label>
          <input [(ngModel)]="editProduct.category.category" name="category" readonly />

          <label>SubCategory</label>
          <input [(ngModel)]="editProduct.subCategory.name" name="subCategory" readonly />

          <div class="modal-actions">
            <button type="submit">Save</button>
            <button type="button" (click)="close.emit()">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./edit-product-modal.component.css']
})
export class EditProductModalComponent {
  @Input() product!: Product;
  @Output() close = new EventEmitter<void>();

  // ⛔️ هنا خليتها FormData بدل ما هي Product
  @Output() updated = new EventEmitter<FormData>();

  editProduct!: Product;
  selectedImageFile: File | null = null;

  ngOnInit() {
    // نعمل نسخة من المنتج عشان ما نبوظش الأصلي
    this.editProduct = { ...this.product };
  }

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImageFile = fileInput.files[0];
    }
  }

  submit() {
    const formData = new FormData();
    formData.append('name', this.editProduct.name);
    formData.append('description', this.editProduct.description);
    formData.append('price', this.editProduct.price.toString());
    formData.append('quantity', this.editProduct.quantity.toString());
    formData.append('brand', this.editProduct.brand._id);
    formData.append('category', this.editProduct.category._id);
    formData.append('subCategory', this.editProduct.subCategory._id);

    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }

    this.updated.emit(formData);
  }
}
