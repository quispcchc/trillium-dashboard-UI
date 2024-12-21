import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private message: string = '';
  private status: 'success' | 'error' | null = null;

  show(message: string, status: 'success' | 'error' | null = 'success'): void {
    this.message = message;
    this.status = status;
    setTimeout(() => this.clear(), 3000); // Clear message after 3 seconds
  }

  clear(): void {
    this.message = '';
    this.status = null;
  }

  getMessage(): string {
    return this.message;
  }

  getStatus(): 'success' | 'error' | null {
    return this.status;
  }
}
