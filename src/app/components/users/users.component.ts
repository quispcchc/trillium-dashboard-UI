import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';

type User = { user_id: number, first_name: string,
  last_name: string, mail: string, role: string, accessible_tabs: string[],
  accessible_forms: string[], department: string, job_title: string,
  admin: boolean }

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  users: any[] = [];
  filteredUsers: any[] = [];
  loading: boolean = false;
  tag_colors = ['beige', 'light-pink', 'mint', 'moss-green'];
  sortDirection: 'asc' | 'desc' = 'asc';
  searchTerm: string = '';
  usersError: boolean = false;
  @Output() showNotification: EventEmitter<{ message: string; status?: 'success' | 'error' | null }> =
  new EventEmitter<{ message: string; status?: 'success' | 'error' | null }>();

  formsModal: {open: boolean, user_name: string, forms: string[], bullet_color: string} = {
    open: false,
    user_name: '',
    forms: [],
    bullet_color: ''
  };

  userFormModal: {open: boolean, mode: 'add' | 'edit' | null,  userData: User | null} = {
    open: false,
    mode: null,
    userData: null
  };

  deleteUserModal: {open: boolean, user: User | null} = {
    open: false,
    user: null
  };

  userName: string | null | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('first_name');
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
        this.showNotification.emit({ message: 'Failed to load users. Please log in again.', status: 'error'})
        this.usersError = true;
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

  openFormsModal(name: string, forms: string[], bullet_color: string) {
    this.formsModal =  {
      open: true,
      user_name: name,
      forms: forms,
      bullet_color: bullet_color
    }
  };

  closeFormsModal() {
    this.formsModal =  {
      open: false,
      user_name: '',
      forms: [],
      bullet_color: ''
    }
  };

  openUserForm(mode: 'add' | 'edit' | null, user?: User) {
  
    this.userFormModal = {
      ...this.userFormModal,
      open: true,
      mode
    }

    if (user && mode === 'edit') {
      const selectedUser = JSON.parse(JSON.stringify(user));
      this.userFormModal = {
        ...this.userFormModal,
        userData: {
          ...selectedUser,
          admin: selectedUser.accessible_tabs?.includes('Admin') || false
        }
      }
    }
  };

  closeUserForm() {
    this.userFormModal = {
      open: false,
      mode: null,
      userData: null
    }
  };

  displayNotification(data: {message: string, status?: 'error' | 'success' | null}) {
    this.showNotification.emit({ message: data.message, status: data.status})
  };

  openDeleteUserModal(user: User) {
    this.deleteUserModal = {
      open: true,
      user
    };
  };

  closeDeleteUserModal() {
    this.deleteUserModal = {
      open: false,
      user: null
    };
  };

  deleteUser(user: any) {
    user.updated_by = this.userName;
    this.userService.deleteUser(user).subscribe({
      next: () => {
        this.filteredUsers = this.filteredUsers.filter(usr => usr.user_id !== user.user_id);
        this.closeDeleteUserModal();
        this.showNotification.emit({message: 'User deleted successfully!'})
      },
      error: (err) => {
        console.error('Error deleting user:', err);
        this.showNotification.emit({message: 'Failed to delete user. Please try again later.', status: 'error'})
      }
    });
  };

}
