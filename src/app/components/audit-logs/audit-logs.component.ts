import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-audit-logs',
  templateUrl: './audit-logs.component.html',
  styleUrl: './audit-logs.component.css'
})
export class AuditLogsComponent implements OnInit {
  tag_colors = ['blue', 'pink', 'purple'];

  loading: boolean = false;
  logs: any[] = [];
  @Output() showNotification: EventEmitter<{ message: string; status?: 'success' | 'error' | null }> =
  new EventEmitter<{ message: string; status?: 'success' | 'error' | null }>()

  constructor(private userService: UserService){}

  // showNotification(data: {message: string, status?: 'error' | 'success' | null}) {
  //   this.notificationService.show(data.message, data.status);
  // }

  ngOnInit(): void {
    this.loading = true;

    this.userService.getAuditLogs().subscribe({
      next: (data) => {
        this.logs = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching Audit Logs:', err);
        this.loading = false;
        this.showNotification.emit({message: 'Failed to load Audit Logs. Please try again later.', status: 'error'})
      }
    });
  }

}
