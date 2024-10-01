import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent {
  selectedTab: string = 'board';
  users: any[] = [];
  filteredUsers: any[] = [];
  loading: boolean = false;
  isModalOpen: boolean = false;
  currentAdminAction: string = 'manageUsers';
  currentFormAction: string = 'accreditation';
  newUser = { firstName: '', lastName: '', email: '', department: '', jobTitle: '', password: '' };
  searchTerm: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private userService: UserService) {}

  setCurrentForm(action: string): void {
    this.currentFormAction = action;
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
    if (tab === 'admin') {
      this.currentAdminAction = 'manageUsers';
      this.manageUsers();
    }
    if (tab === 'dataentry') {
      this.currentFormAction = 'accreditation';
    }
  }

  manageUsers() {
    this.currentAdminAction = 'manageUsers';
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.loading = false;
        alert('Failed to load users. Please try again later.');
      }
    });
  }

  filterUsers() {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.first_name.toLowerCase().includes(term) ||
      user.last_name.toLowerCase().includes(term) ||
      user.mail.toLowerCase().includes(term)
    );
  }

  sort(column: string) {
    const direction = this.sortDirection === 'asc' ? 1 : -1;

    this.filteredUsers.sort((a, b) => {
      if (column === 'name') {
        const nameA = `${a.first_name} ${a.last_name}`;
        const nameB = `${b.first_name} ${b.last_name}`;
        return direction * nameA.localeCompare(nameB);
      } else if (column === 'email') {
        return direction * a.mail.localeCompare(b.mail);
      } else if (column === 'department') {
        return direction * a.department.localeCompare(b.department);
      } else if (column === 'title') {
        return direction * a.job_title.localeCompare(b.job_title);
      }
      return 0;
    });
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }

  openModal() {
    this.isModalOpen = true;
    this.newUser = { firstName: '', lastName: '', email: '', department: '', jobTitle: '', password: '' };
  }

  closeModal() {
    this.isModalOpen = false;
  }

  createUser() {
    const userData = {
      first_name: this.newUser.firstName,
      last_name: this.newUser.lastName,
      mail: this.newUser.email,
      department: this.newUser.department,
      job_title: this.newUser.jobTitle,
      password: this.newUser.password
    };

    this.userService.createUser(userData).subscribe({
      next: (data) => {
        this.users.push(data); // Add new user to the list
        this.filteredUsers.push(data); // Add to filtered list as well
        this.newUser = { firstName: '', lastName: '', email: '', department: '', jobTitle: '', password: '' };
        this.closeModal();
      },
      error: (err) => {
        console.error('Error creating user:', err);
        alert('Failed to create user. Please try again later.');
      }
    });
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.user_id !== userId);
          this.filteredUsers = this.filteredUsers.filter(user => user.user_id !== userId);
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          alert('Failed to delete user. Please try again later.');
        }
      });
    }
  }

  updateUser(user: any) {
    // Logic for updating user
    console.log('Update user:', user);
    //implement a modal or form for updating the user
  }

  auditLogs() {
    this.currentAdminAction = 'auditLogs';
    console.log('Audit Logs clicked');
    // Add logic for viewing audit logs
  }

  isUserFormValid(): boolean {
    return this.newUser.firstName.trim() !== '' &&
           this.newUser.lastName.trim() !== '' &&
           this.newUser.email.trim() !== '' &&
           this.newUser.department.trim() !== '' &&
           this.newUser.jobTitle.trim() !== '' &&
           this.newUser.password.trim() !== '';
  }
  
}
