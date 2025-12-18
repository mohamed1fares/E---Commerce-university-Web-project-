export interface Category {
    _id: string;
    category: string;
    name: string;
    isDeleted:boolean
  }
  
  export interface Subcategory {
    _id: string;
    name: string;
    isDeleted:boolean;
    category:Category 
  }