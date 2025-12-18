import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../core/services/brand.service';
// import { Brand } from '../../../core/models/models';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Brand } from '../../../core/models/brand.model';

@Component({
  selector: 'app-list-brand',
  imports: [CommonModule, RouterLink],
  templateUrl: './list-brand.component.html',
  styleUrl: './list-brand.component.css'
})
export class ListBrandComponent implements OnInit {
  brands: Brand[] = [];

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.brandService.getBrands().subscribe({
      next: (data) => (this.brands = data),
      error: (err) => console.error('Error fetching brands', err),
    });
  }

  deleteBrand(id: string) {
    this.brandService.deleteBrand(id).subscribe({
      next: () => {
        this.brands = this.brands.filter((brand) => brand._id !== id);
      },
      error: (err) => console.error('Delete error:', err),
    });
  }
}
