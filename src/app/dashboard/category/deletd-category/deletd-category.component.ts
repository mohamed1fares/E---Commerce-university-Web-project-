import { Component, OnInit } from '@angular/core';
// import { Category } from '../../../core/models/models';
import { CategoryService } from '../../../core/services/category.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../../core/models/category-sub.model';
// import { Category } from '../../../core/models/category&sub.model';

@Component({
  selector: 'app-deletd-category',
  imports: [CommonModule],
  templateUrl: './deletd-category.component.html',
  styleUrl: './deletd-category.component.css'
})
export class DeletdCategoryComponent implements OnInit {
  deletedcategories: Category[] = [];

  constructor(private _categoryS: CategoryService) {}

  ngOnInit(): void {
    this._categoryS.getCategory().subscribe({
      next: (res) => {
        this.deletedcategories = res.data;
        console.log('Categories:', this.deletedcategories);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }

  restoreSubcategory(id:any){
    this._categoryS.restoreDeletedCategory(id).subscribe({
      next: ()=>{
        this.deletedcategories= this.deletedcategories.filter((sub)=>sub._id!==id)
      },
      error:(err)=>console.error('Delete error:', err),
    })


    
  }




}
