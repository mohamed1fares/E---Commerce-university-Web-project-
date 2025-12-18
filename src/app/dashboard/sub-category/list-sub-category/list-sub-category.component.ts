import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from '../../../core/services/subcategory.service';
// import { Category, Subcategory } from '../../../core/models/models';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';
import { Category, Subcategory } from '../../../core/models/category-sub.model';
// import { Category, Subcategory } from '../../../core/models/category&sub.model';

@Component({
  selector: 'app-list-sub-category',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-sub-category.component.html',
  styleUrl: './list-sub-category.component.css',
})
export class ListSubCategoryComponent implements OnInit {
  subcategories: Subcategory[] = [];
    categories: Category[] = [];
  
  constructor(private _subcategoryS: SubcategoryService,private _categoryS:CategoryService) {}

  ngOnInit(): void {
    this._subcategoryS.getSubcategory().subscribe({
      next: (data) =>{ (this.subcategories = data);
        console.log('subcategories:', this.subcategories);

      
      }
      
    });
    this._categoryS.getCategory().subscribe({
      next: (res) => {
        this.categories = res.data;
        // console.log('Categories:', this.categories);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });

  }

  deleteSubcategory(id: string) {
    // console.log(id)
    this._subcategoryS.deleteSubcategory(id).subscribe({
      next: () => {
        this.subcategories = this.subcategories.filter((sub) => sub._id !== id);
      
      },
      error: (err) => console.error('Delete error:', err),
    });
  }
}
