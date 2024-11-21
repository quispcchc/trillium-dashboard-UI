import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  users: any[] = [];
  filteredUsers: any[] = [];
  loading: boolean = false;
  isModalOpen: boolean = false;
  currentAdminAction: string = 'manageUsers';
  availableForms = ['Community Development', 'Comprehensive Support System - Parent Child and Youth Services',
    'Comprehensive Support System - Client Feedback Surveys', 'Comprehensive Support System - Assertive Community Treatment', 'Comprehensive Support System - Health Promotion and Counselling (Ahmet)',
    'Comprehensive Support System - Health Promotion and Counselling (Omar)', 'Finance & Administration', 'Finance Annual Statement', 'Food Security', 'Emergency Food Cupboard',
    'Healthy Parenting and Childhood', 'Cross-Cutting (Healthy Parenting and Childhood)', 'Youth Education & Empowerment', 'Subcontracting for the Provision of Services - MSAA', 'MSAA',
    'Quality Improvement', 'Client Experience Survey', 'Complaints Report', 'French Language Services', 'Human Resources', 'Incident & Near Miss Reports', "Privacy Officer's Report", 'Strategic Plans']
  availableTabs = ['Admin', 'Board', 'QCA', 'Operational Plan', 'Impact Blueprint', 'Data Entry'];
  newUser = { firstName: '', lastName: '', email: '', accessible_tabs: [] as string[], accessible_forms: [] as string[], department: '', jobTitle: '', password: '', admin: false };
  searchTerm: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  isDeleteModalOpen: boolean = false;
  userToDelete: null = null;
  isEditModalOpen: boolean = false;
  selectedUser: any = null;
  loadingLogs: boolean = false;
  logs: any[] = [];
  userName: string | null | undefined;
  navList!: { name: string, label: string, action: () => void }[];

  constructor(private userService: UserService, public notificationService: NotificationService) { }

  ngOnInit(): void {
    this.manageUsers();
    this.userName = localStorage.getItem('first_name');
    this.newUser.accessible_tabs = [];
    this.newUser.accessible_forms = [];

    this.navList = [
      {
        name: 'manageUsers',
        label: 'Manage Users',
        action: () => {
          this.manageUsers();
        }
      },
      {
        name: 'auditLogs',
        label: 'Audit Logs',
        action: () => {
          this.auditLogs();
        }
      }
    ]
  }

  filterUsers() {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.first_name.toLowerCase().includes(term) ||
      user.last_name.toLowerCase().includes(term) ||
      user.mail.toLowerCase().includes(term)
    );
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
        this.notificationService.show('Failed to load users. Please try again later.');
      }
    });
  }

  createUser() {
    const userData = {
      first_name: this.newUser.firstName,
      last_name: this.newUser.lastName,
      mail: this.newUser.email,
      tabs: this.newUser.accessible_tabs,
      forms: this.newUser.accessible_forms,
      department: this.newUser.department,
      job_title: this.newUser.jobTitle,
      password: this.newUser.password,
      created_by: this.userName
    };

    this.userService.createUser(userData).subscribe({
      next: (data) => {
        this.users.push(data);
        this.filteredUsers.push(data);
        this.newUser = { firstName: '', lastName: '', email: '', accessible_tabs: [], accessible_forms: [], department: '', jobTitle: '', password: '', admin: false };
        this.closeModal();
        this.notificationService.show('User created successfully!');
      },
      error: (err) => {
        console.error('Error creating user:', err);
        this.notificationService.show('Failed to create user. Please try again later.');
      }
    });
  }

  confirmDelete(user: any) {
    this.isDeleteModalOpen = true;
    this.userToDelete = user;
  }

  onDeleteConfirmed(confirmed: boolean) {
    this.isDeleteModalOpen = false;
    if (confirmed && this.userToDelete !== null) {
      this.deleteUser(this.userToDelete);
      this.userToDelete = null;
    }
  }

  deleteUser(user: any) {

    user.updated_by = this.userName;
    this.userService.deleteUser(user).subscribe({
      next: () => {
        this.users = this.users.filter(usr => usr.user_id !== user.user_id);
        this.filteredUsers = this.filteredUsers.filter(usr => usr.user_id !== user.user_id);
        this.notificationService.show('User deleted successfully!');
      },
      error: (err) => {
        console.error('Error deleting user:', err);
        this.notificationService.show('Failed to delete user. Please try again later.');
      }
    });
  }

  updateUser(user: any) {
    this.selectedUser = JSON.parse(JSON.stringify(user));
    this.selectedUser.admin = this.selectedUser.accessible_tabs?.includes('Admin') || false;
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedUser = null;
  }

  updateUserData() {
    const updatedUserData = {
      user_id: this.selectedUser.user_id,
      role: this.selectedUser.role,
      department: this.selectedUser.department,
      job_title: this.selectedUser.job_title,
      updated_by: this.userName,
      accessible_tabs: this.selectedUser.accessible_tabs,
      accessible_forms: this.selectedUser.accessible_forms
    };

    this.userService.updateUser(updatedUserData).subscribe({
      next: (data) => {
        const index = this.users.findIndex(user => user.user_id === this.selectedUser.user_id);
        if (index !== -1) {
          this.users[index] = { ...this.users[index], ...updatedUserData };
          this.filteredUsers[index] = { ...this.filteredUsers[index], ...updatedUserData };
        }
        this.closeEditModal();
        this.notificationService.show('User updated successfully!');
      },
      error: (err) => {
        console.error('Error updating user:', err);
        this.notificationService.show('Failed to update user. Please try again later.');
      }
    });
  }

  auditLogs() {
    this.currentAdminAction = 'auditLogs';
    this.loadingLogs = true;
    this.userService.getAuditLogs().subscribe({
      next: (data) => {
        this.logs = data;
        this.loadingLogs = false;
      },
      error: (err) => {
        console.error('Error fetching Audit Logs:', err);
        this.loadingLogs = false;
        this.notificationService.show('Failed to load Audit Logs. Please try again later.');
      }
    });
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
    this.newUser = { firstName: '', lastName: '', email: '', accessible_tabs: [], accessible_forms: [], department: '', jobTitle: '', password: '', admin: false };
  }

  closeModal() {
    this.isModalOpen = false;
  }

  isEditFormValid(): boolean {
    return this.selectedUser && this.selectedUser.department.trim() !== '' && this.selectedUser.job_title.trim() !== '';
  }

  onTabChange(tab: string, e: Event) {
    const checkbox = (e.target as HTMLInputElement);
    if (checkbox.checked && tab === 'Admin') {
      this.newUser.accessible_tabs = [...this.availableTabs];
      this.newUser.accessible_forms = [...this.availableForms];
      this.newUser.admin = true;
    } else {
      this.newUser.admin = false;
      if (checkbox.checked) {
        this.newUser.accessible_tabs.push(tab);
      } else {
        const index = this.newUser.accessible_tabs.indexOf(tab);
        if (index !== -1) {
          this.newUser.accessible_tabs.splice(index, 1);
        }
      }
    }
  }

  onFormChange(form: string, e: Event) {
    const checkbox = (e.target as HTMLInputElement);
    if (checkbox.checked) {
      this.newUser.accessible_forms.push(form);
    } else {
      const index = this.newUser.accessible_forms.indexOf(form);
      if (index !== -1) {
        this.newUser.accessible_forms.splice(index, 1);
      }
    }
  }

  onTabUpdate(tab: string, e: Event) {
    const checkbox = (e.target as HTMLInputElement);
    if (checkbox.checked && tab === 'Admin') {
      this.selectedUser.accessible_tabs = [...this.availableTabs];
      this.selectedUser.accessible_forms = [...this.availableForms];
      this.selectedUser.admin = true;
    } else {
      this.selectedUser.admin = false;
      if (checkbox.checked) {
        this.selectedUser.accessible_tabs.push(tab);
      } else {
        const index = this.selectedUser.accessible_tabs.indexOf(tab);
        if (index !== -1) {
          this.selectedUser.accessible_tabs.splice(index, 1);
        }
      }
    }
  }

  onFormUpdate(form: string, e: Event) {
    const checkbox = (e.target as HTMLInputElement);

    if (checkbox.checked) {
      this.selectedUser.accessible_forms.push(form);
    } else {
      const index = this.selectedUser.accessible_forms.indexOf(form);
      if (index !== -1) {
        this.selectedUser.accessible_forms.splice(index, 1);
      }
    }
  
  }

  isUserFormValid(): boolean {
    return this.newUser.firstName.trim() !== '' &&
      this.newUser.lastName.trim() !== '' &&
      this.newUser.email.trim() !== '' &&
      this.newUser.department.trim() !== '' &&
      this.newUser.jobTitle.trim() !== '' &&
      this.newUser.password.trim() !== '' &&
      this.newUser.accessible_tabs.length > 0 &&
      this.newUser.accessible_forms.length > 0;
  }
}
