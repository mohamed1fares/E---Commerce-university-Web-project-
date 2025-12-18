import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../../../core/services/category.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  constructor(private _categoryS: CategoryService) {}

  // اسم الفورم هو category بدل name
  categoryForm = new FormGroup({
    category: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
  });

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const data = {
        category: this.categoryForm.get('category')!.value!, // لازم يطابق الباك
      };

      console.log('Category data:', data);

      this._categoryS.addCategory(data).subscribe({
        next: () => {
          alert('Category added successfully!');
          this.categoryForm.reset();
        },
        error: (err) => {
          console.error('Error adding category:', err);
        },
      });
    }
  }
}
