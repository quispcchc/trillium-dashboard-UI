import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isSidebarVisible: boolean = false; // Default to hidden

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    // Subscribe to the SidebarService to listen for visibility changes
    this.sidebarService.isSidebarVisible$.subscribe(visible => {
      this.isSidebarVisible = visible; // Update local state with the visibility value
    });
  }
}