import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrl: './sidebar-layout.component.css'
})
export class SidebarLayoutComponent implements OnInit{
  @Input() navList!: { name: string, label: string, action: () => void }[] | undefined;
  @Input() activeNav!: string;
  @ViewChild('sidebar') sidebar!: ElementRef;
  sidebarOpen!: boolean;

  ngOnInit(): void {
    this.sidebarOpen = JSON.parse(localStorage.getItem('sidebarOpen') || 'true');
  }

  scrollUp() {
    if (window.matchMedia('(max-width: 767px)').matches){
      this.sidebar.nativeElement.scroll({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  openSidebar() {
    this.sidebarOpen = true;
    localStorage.setItem('sidebarOpen', JSON.stringify(true));
  }

  closeSidebar() {
    this.sidebarOpen = false;
    localStorage.setItem('sidebarOpen', JSON.stringify(false));
  }
}
