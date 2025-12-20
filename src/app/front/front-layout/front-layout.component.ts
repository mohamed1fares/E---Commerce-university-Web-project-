import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';
import { SubcategoryService } from '../../core/services/subcategory.service';
import { FilterService } from '../../core/services/filter.service';
// import {  Category, Subcategory } from '../../core/models/models';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FrontNavbarComponent } from '../front-navbar/front-navbar.component';
import { Product } from '../../core/models/product.model';
import { Category, Subcategory } from '../../core/models/category-sub.model';
// import { Category, Subcategory } from '../../core/models/category&sub.model';

@Component({
  selector: 'app-front-layout',
  imports: [CommonModule, RouterOutlet, FrontNavbarComponent],
  templateUrl: './front-layout.component.html',
  styleUrl: './front-layout.component.css'
})export class FrontLayoutComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  filteredSubcategories: Subcategory[] = [];   // دول اللي هيظهروا في الـ select
  selectedCategory: string | null = null;
  selectedSubcategory: string | null = null;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        const arr: Product[] = Array.isArray(data)
          ? data
          : (data?.data as Product[]) ?? [];
        
        this.products = arr;
        this.filteredProducts = arr;
      }
    });

    this.categoryService.getCategory().subscribe({
      next: (res: any) => {
        const arr: Category[] = Array.isArray(res)
          ? res
          : (res?.data as Category[]) ?? [];
        this.categories = arr.filter((c) => !c.isDeleted);
      }
    });

    this.subcategoryService.getSubcategory().subscribe({
      next: (res: any) => {
        const arr: Subcategory[] = Array.isArray(res)
          ? res
          : (res?.data as Subcategory[]) ?? [];
        this.subcategories = arr.filter((s) => !s.isDeleted);
      }
    });
  }

  onCategoryChange(categoryId: string) {
    this.selectedCategory = categoryId || null;
    this.selectedSubcategory = null; // reset subcategory
    this.filteredSubcategories = this.subcategories.filter(
      (s) => s.category?._id === categoryId
    );

    this.filterProducts(this.selectedCategory, null);
  }

  onSubcategoryChange(subcategoryId: string) {
    this.selectedSubcategory = subcategoryId || null;
    this.filterProducts(this.selectedCategory, this.selectedSubcategory);
  }

  filterProducts(categoryId: string | null, subcategoryId: string | null) {
    this.filterService.setFilter({
      category: categoryId,
      subcategory: subcategoryId
    });
  }
}