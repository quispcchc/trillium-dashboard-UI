import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{

  @Output() changeTab = new EventEmitter<string>();
  @Output() logoutUser = new EventEmitter<void>();

  accessibleTabs: string  | null | undefined;

  ngOnInit(): void {
    this.accessibleTabs = localStorage.getItem('accessible_tabs');
  }

  isRoleAccessible(role: string): boolean {
    const accessibleTabsArray = this.accessibleTabs ? this.accessibleTabs.split(',') : [];
    return accessibleTabsArray.includes(role);
  }

  switchTab(name: string): void {
    this.changeTab.emit(name);
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }

  logout():void {
    this.logoutUser.emit();
  }

}
