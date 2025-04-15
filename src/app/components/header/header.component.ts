import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() selectedTab!: string;
  @Input() tabList!: { name: string, label: string, img: string, action: () => void }[] | undefined;
  @Output() logoutUser = new EventEmitter<void>();

  userName: string | null | undefined;
  userEmail: string | null | undefined;

  menuOpen: boolean = false;
  fadeOut: boolean = false;
  showProfile: boolean = false;

  ngOnInit(): void {
    this.userName = localStorage.getItem('first_name');
    this.userEmail = localStorage.getItem('email');
  }

  logout(): void {
    this.logoutUser.emit();
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
