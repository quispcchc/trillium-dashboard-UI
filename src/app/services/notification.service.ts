import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private message: string = '';

  show(message: string): void {
    this.message = message;
    setTimeout(() => this.clear(), 3000); // Clear message after 3 seconds
  }

  clear(): void {
    this.message = '';
  }

  getMessage(): string {
    return this.message;
  }
}
