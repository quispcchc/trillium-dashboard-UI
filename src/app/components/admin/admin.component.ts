import { Component, OnInit} from '@angular/core';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit  {

  users: any[] = [];
  filteredUsers: any[] = [];
  loading: boolean = false;
  isModalOpen: boolean = false;
  currentAdminAction: string = 'manageUsers';
  currentFormAction: string = 'accreditation';
  newUser = { firstName: '', lastName: '', email: '', role: '', department: '', jobTitle: '', password: '' };
  searchTerm: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  isDeleteModalOpen: boolean = false;
  userIdToDelete: number | null = null;
  isEditModalOpen: boolean = false;
  selectedUser: any = null;

  constructor(private userService: UserService, public notificationService: NotificationService) { }

  ngOnInit(): void {
    this.manageUsers();
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
      role: this.newUser.role,
      department: this.newUser.department,
      job_title: this.newUser.jobTitle,
      password: this.newUser.password
    };

    this.userService.createUser(userData).subscribe({
      next: (data) => {
        this.users.push(data);
        this.filteredUsers.push(data);
        this.newUser = { firstName: '', lastName: '', email: '', role: '', department: '', jobTitle: '', password: '' };
        this.closeModal();
        this.notificationService.show('User created successfully!');
      },
      error: (err) => {
        console.error('Error creating user:', err);
        this.notificationService.show('Failed to create user. Please try again later.');
      }
    });
  }

  confirmDelete(userId: number) {
    this.isDeleteModalOpen = true;
    this.userIdToDelete = userId;
  }

  onDeleteConfirmed(confirmed: boolean) {
    this.isDeleteModalOpen = false;
    if (confirmed && this.userIdToDelete !== null) {
      this.deleteUser(this.userIdToDelete);
      this.userIdToDelete = null;
    }
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.user_id !== userId);
        this.filteredUsers = this.filteredUsers.filter(user => user.user_id !== userId);
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
      job_title: this.selectedUser.job_title
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
      } else if (column === 'role') {
        return direction * a.role.localeCompare(b.role);
      }
      return 0;
    });
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }

  openModal() {
    this.isModalOpen = true;
    this.newUser = { firstName: '', lastName: '', email: '', role: '', department: '', jobTitle: '', password: '' };
  }

  closeModal() {
    this.isModalOpen = false;
  }

  isEditFormValid(): boolean {
    return this.selectedUser && this.selectedUser.department.trim() !== '' && this.selectedUser.job_title.trim() !== '';
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