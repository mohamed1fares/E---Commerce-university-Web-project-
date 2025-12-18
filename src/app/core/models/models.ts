// export interface Auth {
//   token: string;
// }

import { Product } from "./product.model";

// export interface About {
//   title: string;
//   facebookLink: string;
// }

// export interface Category {
//   _id: string;
//   category: string;
//   name: string;
//   isDeleted:boolean
// }

// export interface Subcategory {
//   _id: string;
//   name: string;
//   isDeleted:boolean;
//   category:Category 
// }

// export interface Brand {
//   _id: string;
//   name: string;
//   isDeleted:boolean
// }

// export interface User {
//   name: string;
//   email: string;
//   phone: string;
//   location: string;
//   password: string;
//   role: string;
// }


interface ApiResponse<T> {//for test debug 
  data: T;
}

// export interface Product {
//   _id: string;
//   name: string;//done
//   image: string;//done
//   description: string//done;
//   price: number;//done
//   quantity: number;
//   stockStatus?: string;//done
//   isDeleted?: boolean;//done
//   brand: Brand;//done
//   category: Category;
//   subCategory: Subcategory;//done
//   route:string
  
// }





// export interface OrderItem {
//   product: Product;
//   quantity: number;
// }

// export interface Order {
//   _id: string;
//   user: {
//     _id: string;
//     name: string;
//     email: string;
//   };
//   orderItems?: OrderItem[];   
//   product?: Product;          
//   quantity?: number;
//   status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
//   total: number;
//   createdAt?: string;
//   updatedAt?: string;
// }
