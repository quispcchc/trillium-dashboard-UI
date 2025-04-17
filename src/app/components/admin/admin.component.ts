import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  currentAdminAction: string = 'manageUsers';
  navList!: { name: string, label: string, action: () => void }[];

  constructor(public notificationService: NotificationService) { }

  ngOnInit(): void {
    this.currentAdminAction = 'manageUsers';

    this.navList = [
      {
        name: 'manageUsers',
        label: 'Manage Users',
        action: () => {
          this.currentAdminAction = 'manageUsers';
        }
      },
      {
        name: 'manageDashboards',
        label: 'Manage Dashboards',
        action: () => {
          this.currentAdminAction = 'manageDashboards';
        }
      },
      {
        name: 'auditLogs',
        label: 'Audit Logs',
        action: () => {
          this.currentAdminAction = 'auditLogs';
        }
      }
    ]
  }

  showNotification(data: {message: string, status?: 'error' | 'success' | null}) {
    this.notificationService.show(data.message, data.status);
  }

}
