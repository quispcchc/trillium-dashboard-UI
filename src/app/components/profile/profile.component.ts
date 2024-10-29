import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  @Output() close = new EventEmitter<void>();
  @Output() logoutUser = new EventEmitter<void>();
  @Input() name!: string | null | undefined;
  @Input() email!: string | null | undefined;
  @Input() role!: string | null | undefined;

  constructor(private router: Router) {}

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }

  logout(): void {
    this.logoutUser.emit();
  }

  resetPassword() {
    this.router.navigate(['/forgot-password']);
  }

}
