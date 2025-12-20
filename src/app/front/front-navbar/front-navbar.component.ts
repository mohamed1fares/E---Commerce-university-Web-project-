import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-front-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './front-navbar.component.html',
  styleUrls: ['./front-navbar.component.css'],
})
export class FrontNavbarComponent implements OnInit {
  
  searchTerm = '';
  constructor(
    private router: Router,
    private productService: ProductService,
    public authService: AuthService
  ) {}
  
  onSearch() {
    this.router.navigate([''], { queryParams: { search: this.searchTerm } });
  }

  goToProfile() {
    this.router.navigate(['/orderhistory']);
  }
  
  goToCart() {
    this.router.navigate(['/cart']);
  }
  
  goToLogin() {
    this.router.navigate(['/login']);
  }
  
  goToSignup() {
    this.router.navigate(['/signup']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  isAdmin: boolean = false;
  ngOnInit(): void {
    
    this.isAdmin = this.authService.getRole() === 'admin';
  }

  dashborad() {
    this.router.navigate(['/dashboard']);
  }

}
