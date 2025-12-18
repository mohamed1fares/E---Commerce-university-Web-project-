import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// import { Category, Subcategory, Brand } from '../../../core/models/models';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { SubcategoryService } from '../../../core/services/subcategory.service';
import { BrandService } from '../../../core/services/brand.service';
// import { Category, Subcategory } from '../../../core/models/category&sub.model';
import { Brand } from '../../../core/models/brand.model';
import { Category, Subcategory } from '../../../core/models/category-sub.model';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  productForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    image: new FormControl<File | null>(null, Validators.required),
    description: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    price: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0.01),
    ]),
    quantity: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
    ]),
    brand: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    categoryId: new FormControl<string | null>(null, [Validators.required]),
    subcategoryId: new FormControl<string | null>(
      { value: null, disabled: true },
      [Validators.required]
    ),
  });

  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  filteredSubcategories: Subcategory[] = [];
  brands: Brand[] = [];

  selectedImageFile: File | null = null;

  constructor(
    private _productS: ProductService,
    private _categoryS: CategoryService,
    private _subcategory: SubcategoryService,
    private _brandS: BrandService
  ) {}

  get subcategoryControl(): FormControl<number | null> {
    return this.productForm.get('subcategoryId') as FormControl<number | null>;
  }

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImageFile = fileInput.files[0];
      this.productForm.patchValue({
        image: this.selectedImageFile,
      });
    }
  }

  ngOnInit(): void {
    this._categoryS.getCategory().subscribe({
      next: (res) => {
        console.log('✅ Categories from server:', res.data);

        this.categories = Array.isArray(res.data) ? res.data : [];
      },
    });

    this._subcategory.getSubcategory().subscribe({
      next: (data) => {
        console.log('✅ subgategory from server:', data);

        this.subcategories = Array.isArray(data) ? data : [];
      },
    });

    this._brandS.getBrands().subscribe({
      next: (data) => {
        this.brands = Array.isArray(data) ? data : [];
      },
      error: (err) => console.error('Error fetching brands', err),
    });

    this.productForm.get('categoryId')?.valueChanges.subscribe((categoryId) => {
      if (categoryId) {
        this.filteredSubcategories = this.subcategories.filter(
          (sub) => (sub.category?._id || sub.category) === categoryId
        );
    
        this.productForm.get('subcategoryId')?.enable();
        this.productForm.get('subcategoryId')?.reset();
      } else {
        this.filteredSubcategories = [];
        this.productForm.get('subcategoryId')?.disable();
        this.productForm.get('subcategoryId')?.reset();
      }
    });
    
  }

  onSubmit(): void {
    if (this.productForm.valid && this.selectedImageFile) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name')?.value || '');
      formData.append('image', this.selectedImageFile);
      formData.append(
        'description',
        this.productForm.get('description')?.value || ''
      );
      formData.append(
        'price',
        this.productForm.get('price')?.value?.toString() || ''
      );
      formData.append(
        'quantity',
        this.productForm.get('quantity')?.value?.toString() || ''
      );
      formData.append('brand', this.productForm.get('brand')?.value || '');
      formData.append('category', this.productForm.get('categoryId')?.value?.toString() || '');

      formData.append('subCategory', this.productForm.get('subcategoryId')?.value?.toString() || '');
      formData.append('stock', this.productForm.get('quantity')?.value?.toString() || ''); // أو اعمل ليه input منفصل



      this._productS.addProduct(formData).subscribe({
        next: () => {
          this.productForm.reset();
          this.filteredSubcategories = [];
          this.productForm.get('subcategoryId')?.disable();
          this.selectedImageFile = null;
        },
        error: (err) => {
          console.error('Add product error:', err);
        },
      });
    } else {
      this.productForm.markAllAsTouched();
    }
  }
}
