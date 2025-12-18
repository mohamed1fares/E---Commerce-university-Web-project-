import { Component } from '@angular/core';
import { DashboardSidebarComponent } from '../../shared/dashboard-sidebar/dashboard-sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  imports: [DashboardSidebarComponent, RouterOutlet],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {}
