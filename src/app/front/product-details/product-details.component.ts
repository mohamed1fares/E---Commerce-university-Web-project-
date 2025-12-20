import { Component, OnInit } from '@angular/core';
// import { Product } from '../../core/models/models';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  relatedProducts: Product[] = [];
  loading = true;
  error = '';

  constructor(private route: ActivatedRoute, private productService: ProductService,private _cart:CartService) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const routeParam = paramMap.get('route');
      if (!routeParam) return;
  
      this.loading = true;
      this.error = '';
      this.product = undefined;
      this.relatedProducts = [];
  
      this.productService.getProductByRoute(routeParam).subscribe({
        next: (prod) => {
          this.product = prod;
          this.loading = false;
          console.log(this.product);
  
          // Related products
          if (this.product.subCategory._id) {
            this.productService.getRelatedProducts(this.product.subCategory._id).subscribe({
              next: (related) => {
                this.relatedProducts = related.filter(p => p._id !== this.product?._id);
                console.log(this.relatedProducts);
              },
              error: (err) => console.error(err)
            });
          }
        },
        error: (err) => {
          console.error(err);
          this.error = 'Failed to load product';
          this.loading = false;
        }
      });
    });
  }
  
  addToCart(id: string) {
    this._cart.addToCart(id).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}