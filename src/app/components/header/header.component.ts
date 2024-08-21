import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '@services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // Inject the router and sidebar service
  constructor(
    private router: Router,
    private sidebarService: SidebarService
  ) { }

  // Method to toggle the sidebar
  toggleSidebar(): void {
    this.sidebarService.toggle(); // Call the service method to toggle the sidebar
  }

  // Method to handle user logout
  logout(): void {
    // Clear authentication data or token
    localStorage.removeItem('authToken'); // Adjust if your token storage differs

    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}