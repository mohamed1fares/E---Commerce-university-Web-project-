import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrandService } from '../../../core/services/brand.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-brand',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-brand.component.html',
  styleUrl: './add-brand.component.css',
})
export class AddBrandComponent implements OnInit {
  brandForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.brandForm.valid) {
      const name = this.brandForm.get('name')?.value || '';

      this.brandService.createBrand({ name }).subscribe({
        next: () => this.brandForm.reset(),
        error: (err) => console.error('Create Brand Error:', err),
      });
    }
  }
}
