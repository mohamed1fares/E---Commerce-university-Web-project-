import { Brand } from "./brand.model";
import { Category, Subcategory } from "./category-sub.model";
// import { Category, Subcategory } from "./category&sub.model";

export interface Product {
  _id: string;
  name: string;//done
  image: string;//done
  description: string//done;
  price: number;//done
  quantity: number;
  stockStatus?: string;//done
  isDeleted?: boolean;//done
  brand: Brand;//done
  category: Category;
  subCategory: Subcategory;//done
  route:string
  
}





export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  orderItems?: OrderItem[];   
  product?: Product;          
  quantity?: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  total: number;
  createdAt?: string;
  updatedAt?: string;
}
