import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private router: Router,
  ) { }

  // Method to handle user logout
  logout(): void {
    // Clear authentication data or token
    localStorage.removeItem('authToken'); // Adjust if your token storage differs

    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}