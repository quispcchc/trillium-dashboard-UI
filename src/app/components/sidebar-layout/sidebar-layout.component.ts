import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrl: './sidebar-layout.component.css'
})
export class SidebarLayoutComponent {
  @Input() navList!: { name: string, label: string, action: () => void }[] | undefined;
  @Input() activeNav!: string;
  @ViewChild('sidebar') sidebar!: ElementRef;

  scrollUp() {
    if (window.matchMedia('(max-width: 767px)').matches){
      this.sidebar.nativeElement.scroll({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
