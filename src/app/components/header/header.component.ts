import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string | null | undefined;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
     this.userName = localStorage.getItem('first_name');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('first_name');
    this.router.navigate(['/login']);
  }
}