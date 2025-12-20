import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private _authS: AuthService, private router: Router) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    const email = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;

    const data = { email: email!, password: password! };

    this._authS.login(data).subscribe({
      next: () => {
        const token = this._authS.getToken();
        let role = null;
        if (token) {
          const decoded: any = jwtDecode(token);
          role = decoded.role;
        }
        if (role === 'admin') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
