import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() selectedTab!: string;
  @Output() changeTab = new EventEmitter<string>();
  @Output() logoutUser = new EventEmitter<void>();

  userName: string | null | undefined;
  userRole: string | null | undefined;
  userEmail: string | null | undefined;
  accessibleRoles: string  | null | undefined;

  menuOpen: boolean = false;
  fadeOut: boolean = false;
  showProfile: boolean = false;

  ngOnInit(): void {
    this.userName = localStorage.getItem('first_name');
    this.userRole = localStorage.getItem('role');
    this.userEmail = localStorage.getItem('email');
    this.accessibleRoles = localStorage.getItem('accessible_roles');
  }

  isRoleAccessible(role: string): boolean {
    const accessibleRolesArray = this.accessibleRoles ? this.accessibleRoles.split(',') : [];
    return accessibleRolesArray.includes(role);
  }

  logout(): void {
    this.logoutUser.emit();
  }

  switchTab(name: string, mobile:boolean = false): void {
    this.changeTab.emit(name);

    if (mobile) {
      this.menuOpen = false;
    }
  }

  setMenu(state: boolean) {

    if (!state) {
      this.fadeOut = true;
      setTimeout(() => {
        this.fadeOut = false;
        this.menuOpen = state;
      }, 500);
    } else {
        this.menuOpen = state;
    }
    
  }

}
