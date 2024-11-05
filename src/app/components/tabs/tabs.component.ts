import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})

export class TabsComponent implements OnInit {
  @Input() selectedTab!: string;
  userRole: string | null | undefined;

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role');
  }
  
  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
}
