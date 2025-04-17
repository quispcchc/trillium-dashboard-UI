import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DashboardsService } from '@services/dashboards.service';

@Component({
  selector: 'app-manage-dashboards',
  templateUrl: './manage-dashboards.component.html',
  styleUrl: './manage-dashboards.component.css'
})
export class ManageDashboardsComponent implements OnInit {

  @Output() showNotification: EventEmitter<{ message: string; status?: 'success' | 'error' | null }> =
  new EventEmitter<{ message: string; status?: 'success' | 'error' | null }>()

  loading: boolean = false;
  searchTerm: string = '';
  dashboards: any[] = [];
  filteredDashboards: any[] = [];
  dashboardsError: boolean = false;

  constructor(private dashboardsService: DashboardsService) { }

  ngOnInit(): void {
    this.loading = true;
    this.dashboardsService.getAllDashboards().subscribe({
      next: (data) => {
        this.dashboards = data;
        this.filteredDashboards = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching dashboards:', err);
        this.loading = false;
        this.showNotification.emit({ message: 'Failed to load dashboards. Please log in again.', status: 'error'})
        this.dashboardsError = true;
      }
    });
  }

  filterDashboards() {
    const term = this.searchTerm.toLowerCase();
    this.filteredDashboards = this.dashboards.filter(dashboard =>
      dashboard.name.toLowerCase().includes(term) ||
      dashboard.label.toLowerCase().includes(term)
    );
  }
}
