import { Component, OnInit } from '@angular/core';
// import { Brand } from '../../../core/models/models';
import { BrandService } from '../../../core/services/brand.service';
import { CommonModule } from '@angular/common';
import { Brand } from '../../../core/models/brand.model';

@Component({
  selector: 'app-deleted-brand',
  imports: [CommonModule],
  templateUrl: './deleted-brand.component.html',
  styleUrl: './deleted-brand.component.css'
})
export class DeletedBrandComponent implements OnInit {
 brands: Brand[] = [];

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.brandService.getBrands().subscribe({
      next: (data) => (this.brands = data),
      error: (err) => console.error('Error fetching brands', err),
    });
  }

  restoreSubcategory(id:any){
    this.brandService.reStoreBrand(id).subscribe({
      next: ()=>{
        this.brands= this.brands.filter((sub)=>sub._id!==id)
      },
      error:(err)=>console.error('Delete error:', err),
    })


    
  }


}

