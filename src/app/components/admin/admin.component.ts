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
  currentFormAction: string = 'accreditation';
  availableForms = ['Accreditation', 'Comprehensive Support System', 'MSAA', 'Subcontracting for the Provision of Services', 
    'Quality Improvement', 'Finance & Administration', 'Healthy Parenting and Childhood', 'Access to Primary Health Care',
    'Youth Education & Empowerment', 'Cross-Cutting', 'Department/Category Restructure', 'Food Security', 'Annual All Staff Satisfaction Survey',
    'Community Development', 'Client Experience Survey', 'Complaints Report', 'French Language Services', 'Human Resources', 
    'Incident & Near Miss Reports', 'Privacy Officers Report', 'Strategic Plans'];
  availableRoles = ['Admin', 'Board', 'QCA', 'Operational Plan', 'Impact Blueprint', 'Data Entry'];
  newUser = { firstName: '', lastName: '', email: '', roles: [] as string[], forms: [] as string[], department: '', jobTitle: '', password: '' };
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
    this.newUser.roles = [];
    this.newUser.forms = [];

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
      roles: this.newUser.roles,
      forms: this.newUser.forms,
      department: this.newUser.department,
      job_title: this.newUser.jobTitle,
      password: this.newUser.password,
      created_by: this.userName
    };

    this.userService.createUser(userData).subscribe({
      next: (data) => {
        this.users.push(data);
        this.filteredUsers.push(data);
        this.newUser = { firstName: '', lastName: '', email: '', roles: [], forms: [], department: '', jobTitle: '', password: '' };
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
    this.selectedUser = { ...user };
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
      updated_by: this.userName
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
    this.newUser = { firstName: '', lastName: '', email: '', roles: [], forms: [], department: '', jobTitle: '', password: '' };
  }

  closeModal() {
    this.isModalOpen = false;
  }

  isEditFormValid(): boolean {
    return this.selectedUser && this.selectedUser.department.trim() !== '' && this.selectedUser.job_title.trim() !== '';
  }

  onRoleChange(role: string) {
    if (this.newUser.roles.includes(role)) {
      const index = this.newUser.roles.indexOf(role);
      if (index !== -1) {
        this.newUser.roles.splice(index, 1);
      }
    } else {
      this.newUser.roles.push(role);
    }
  }

  onFormChange(form: string) {
    if (this.newUser.forms.includes(form)) {
      const index = this.newUser.forms.indexOf(form);
      if (index !== -1) {
        this.newUser.forms.splice(index, 1);
      }
    } else {
      this.newUser.forms.push(form);
    }
  }

  isUserFormValid(): boolean {
    return this.newUser.firstName.trim() !== '' &&
      this.newUser.lastName.trim() !== '' &&
      this.newUser.email.trim() !== '' &&
      this.newUser.department.trim() !== '' &&
      this.newUser.jobTitle.trim() !== '' &&
      this.newUser.password.trim() !== '' &&
      this.newUser.roles.length > 0 &&
      this.newUser.forms.length > 0;
  }
}
