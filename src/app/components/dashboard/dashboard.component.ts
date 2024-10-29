import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedTab: string = 'board';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  changeTab(tab: string): void {
    this.selectedTab = tab;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('first_name');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }

}
