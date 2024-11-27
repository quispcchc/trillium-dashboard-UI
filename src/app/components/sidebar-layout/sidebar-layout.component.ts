import { Component, Input,OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrl: './sidebar-layout.component.css'
})
export class SidebarLayoutComponent implements OnInit{
  @Input() navList!: { name: string, label: string, action: () => void }[];
  @Input() activeNav!: string;
  @ViewChild('sidebar') sidebar!: ElementRef;
  @Input() shouldFilterTabs!: boolean;
  accessibleForms: string  | null | undefined;
  filteredNavList: { name: string, label: string, action: () => void }[] = [];

  ngOnInit(): void {
    console.log("filter or not:", this.shouldFilterTabs);
    if (this.shouldFilterTabs) {
      this.accessibleForms = localStorage.getItem('accessible_forms');
      if (this.navList) {
        this.filteredNavList = this.navList.filter(btn => this.isFormAccessible(btn.label));
      }
    } else {
      this.filteredNavList = this.navList;
    }
  }

  isFormAccessible(form: string): boolean {
    const accessibleFormsArray = this.accessibleForms ? this.accessibleForms.split(',').map(form => form.trim()) : [];
    return accessibleFormsArray.includes(form.trim());
  }  

  scrollUp() {
    if (window.matchMedia('(max-width: 767px)').matches){
      this.sidebar.nativeElement.scroll({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
