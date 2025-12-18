import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// import { Category } from '../../../core/models/models';
import { CategoryService } from '../../../core/services/category.service';
import { SubcategoryService } from '../../../core/services/subcategory.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../../core/models/category-sub.model';
// import { Category } from '../../../core/models/category&sub.model';

@Component({
  selector: 'app-add-sub-category',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-sub-category.component.html',
  styleUrl: './add-sub-category.component.css',
})
export class AddSubCategoryComponent implements OnInit {
  subcategoryForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    category: new FormControl<string | null>(null, [Validators.required]),
  });

  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe({
      next: (res: any) => {
        this.categories = res.data;
      },
    });
  }

  onSubmit(): void {
    if (this.subcategoryForm.valid) {
      const formValue = this.subcategoryForm.value;

      this.subcategoryService.createSubcategory(formValue).subscribe({
        next: () => {
          this.subcategoryForm.reset();
        },
        error: (err) => console.error('Create error:', err),
      });
    }
  }
}
