import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../core/services/category.service';
// import { Category } from '../../../core/models/models';
import { RouterLink } from '@angular/router';
import { Category } from '../../../core/models/category-sub.model';
// import { Category } from '../../../core/models/category&sub.model';

@Component({
  selector: 'app-list-category',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.css',
})
export class ListCategoryComponent implements OnInit {
  categories: Category[] = [];

  constructor(private _categoryS: CategoryService) {}

  ngOnInit(): void {
    this._categoryS.getCategory().subscribe({
      next: (res) => {
        this.categories = res.data;
        console.log('Categories:', this.categories);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }




  deleteSubcategory(id: string) {
    // console.log(id)
    this._categoryS.softDeletedCategory(id).subscribe({
      next: () => {
        this.categories = this.categories.filter((sub) => sub._id !== id);
      
      },
      error: (err) => console.error('Delete error:', err),
    });
  }



}
