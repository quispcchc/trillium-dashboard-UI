import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarVisible = new BehaviorSubject<boolean>(false); // Sidebar hidden by default
  isSidebarVisible$ = this.sidebarVisible.asObservable();

  toggle(): void {
    this.sidebarVisible.next(!this.sidebarVisible.value);
  }
}