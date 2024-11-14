import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{

  @Output() changeTab = new EventEmitter<string>();
  @Output() logoutUser = new EventEmitter<void>();

  accessibleRoles: string  | null | undefined;

  ngOnInit(): void {
    this.accessibleRoles = localStorage.getItem('accessible_roles');
  }

  isRoleAccessible(role: string): boolean {
    const accessibleRolesArray = this.accessibleRoles ? this.accessibleRoles.split(',') : [];
    return accessibleRolesArray.includes(role);
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
