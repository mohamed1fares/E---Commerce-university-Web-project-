import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
// import { Subcategory } from '../../../core/models/models';
import { SubcategoryService } from '../../../core/services/subcategory.service';
import { Subcategory } from '../../../core/models/category-sub.model';
// import { Subcategory } from '../../../core/models/category&sub.model';

@Component({
  selector: 'app-deleted-category',
  imports: [CommonModule],
  templateUrl: './deleted-category.component.html',
  styleUrl: './deleted-category.component.css',
})
export class DeletedCategoryComponent implements OnInit {
  deletedSubcategories: Subcategory[] = [];

  constructor(private _subcategoryS: SubcategoryService) {}

  ngOnInit(): void {
    this._subcategoryS.getDeletedSubcategories().subscribe({
      next: (data) => (this.deletedSubcategories = data),
      error: (err) =>
        console.error('Error fetching deleted subcategories', err),
    });
  }

  restoreSubcategory(id:string){
    this._subcategoryS.restoreDeletedSubcategory(id).subscribe({
      next: ()=>{
        this.deletedSubcategories= this.deletedSubcategories.filter((sub)=>sub._id!==id)
      },
      error:(err)=>console.error('Delete error:', err),
    })


    
  }
}
