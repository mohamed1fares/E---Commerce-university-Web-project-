import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../core/models/user.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `    
  <div class="signup-container">
  <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
    <h2>Sign Up</h2>
    <label>Name</label>
    <input formControlName="name" placeholder="Full Name" />
    
    <label>Email</label>
    <input formControlName="email" type="email" placeholder="Email" />
    
    <label>Phone</label>
    <input formControlName="phone" placeholder="Phone" />
    
    <label>Location</label>
    <input formControlName="location" placeholder="Location" />
    
    <label>Password</label>
    <input formControlName="password" type="password" placeholder="Password" />
    
    <!-- <label>Role</label>
    <select formControlName="role">
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select> -->
    
    <button type="submit" [disabled]="signupForm.invalid">Sign Up</button>
  </form>
</div>
  `,
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('user', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value as User).subscribe({
        next: res => {
          console.log('Signup success ✅', res);
          this.router.navigate(['/login']);
        },
        error: err => {
          console.error('Signup failed ❌', err);
          alert('Signup failed: ' + (err.error?.message || err.message));
        }
      });
    }
  }
} 