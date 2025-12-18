import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-sidebar',
  imports: [RouterLink],
  templateUrl: './dashboard-sidebar.component.html',
  styleUrl: './dashboard-sidebar.component.css',
})
export class DashboardSidebarComponent {
  constructor(private _authS: AuthService, private router: Router) {}

  logout() {
    this._authS.logout();
    this.router.navigate(['/login']);
  }
  backhome(){
    this.router.navigate(['/']);
  }
}
