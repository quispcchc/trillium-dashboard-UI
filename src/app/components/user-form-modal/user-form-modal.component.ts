import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';

type User = { user_id: number, first_name: string, last_name: string, mail: string, accessible_tabs: string[], accessible_forms: string[], department: string,
  job_title: string, admin: boolean };

@Component({
  selector: 'app-user-form-modal',
  templateUrl: './user-form-modal.component.html',
  styleUrl: './user-form-modal.component.css'
})
export class UserFormModalComponent implements OnInit{
  @Input() modalOpen!:boolean;
  @Input() mode!: 'add' | 'edit' | null;
  @Input() userData!: User | null;
  @Input() userList!: any[];

  @Output() closeModal = new EventEmitter<void>();
  @Output() showNotification: EventEmitter<{ message: string; status?: 'success' | 'error' | null }> =
  new EventEmitter<{ message: string; status?: 'success' | 'error' | null }>();

  userForm!: FormGroup;
  accessible_tabs!: string[];
  accessible_forms!: string[];
  isUserAdmin: boolean = false;
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  userName: string | null | undefined;

  availableForms = ['Community Development', 'Comprehensive Support System - Parent Child and Youth Services',
    'Comprehensive Support System - Client Feedback Surveys', 'Comprehensive Support System - Assertive Community Treatment',
    'Comprehensive Support System - Health Promotion and Counselling (Ahmet)',
    'Comprehensive Support System - Health Promotion and Counselling (Omar)',
    'Finance & Administration', 'Finance Annual Statement', 'Food Security',
    'Emergency Food Cupboard', 'Healthy Parenting and Childhood',
    'Cross-Cutting (Healthy Parenting and Childhood)', 'Youth Education & Empowerment',
    'Subcontracting for the Provision of Services - MSAA', 'MSAA', 'Quality Improvement',
    'Client Experience Survey', 'Complaints Report', 'French Language Services', 'Human Resources',
    'Incident & Near Miss Reports', "Privacy Officer's Report", 'Strategic Plans'];
  availableTabs = ['Admin', 'Executive Overview', 'PHC', 'QCA', 'Operational Plan', 'Impact Blueprint', 'Data Entry'];

  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService,
    private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.initializeForm(this.mode);
    this.userName = localStorage.getItem('first_name');
  };

  initializeForm(mode: string | null) {
    if (mode === 'add') {
      this.userForm = this.fb.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6),
                  this.authService.passwordValidator.bind(this)]],
        confirm_password: ['', [Validators.required, Validators.minLength(6),
          this.confirmPasswordValidator.bind(this)]],
        email: ['', [Validators.required, Validators.email]],
        department: ['', Validators.required],
        job_title: ['', Validators.required],
      })

      this.accessible_tabs = [];
      this.accessible_forms = [];
    }

    else if (mode === 'edit') {
      this.userForm = this.fb.group({
        first_name: [{value: this.userData?.first_name, disabled: true}],
        last_name: [{value: this.userData?.last_name, disabled: true}],
        email: [{value: this.userData?.mail, disabled: true}],
        department: [this.userData?.department, Validators.required],
        job_title: [this.userData?.job_title, Validators.required]
      })

      this.accessible_tabs = this.userData?.accessible_tabs ?  [...this.userData.accessible_tabs] : [];
      this.accessible_forms = this.userData?.accessible_forms ? [...this.userData.accessible_forms] : [];
      this.isUserAdmin = this.userData?.admin || false;
    }
  };

  get first_name() {
    return this.userForm?.get('first_name');
  };

  get last_name() {
    return this.userForm?.get('last_name');
  };

  get email() {
    return this.userForm?.get('email');
  };

  get password() {
    return this.userForm?.get('password');
  };

  get confirm_password() {
    return this.userForm?.get('confirm_password');
  };

  get department() {
    return this.userForm?.get('department');
  };

  get job_title() {
    return this.userForm?.get('job_title');
  };

  dismissModal() {
    this.closeModal.emit();
  };

  confirmPasswordValidator(control: FormControl) {
    const confirmPasswordInput = control?.value;
    const password = this.password?.value;

    if (confirmPasswordInput && password !== confirmPasswordInput) {
      return { passwordMismatch: true };
    } else {
      return null;
    }
  };

  createUser() {
    if (this.userForm.valid) {
      const newUser = {
        first_name: this.first_name?.value,
        last_name: this.last_name?.value, 
        mail: this.email?.value,
        tabs: this.accessible_tabs,
        forms: this.accessible_forms,
        department: this.department?.value,
        job_title: this.job_title?.value,
        password: this.password?.value,
        created_by: this.userName
      }

      this.userService.createUser(newUser).subscribe({
        next: (data) => {
          this.userList.push(data);
          this.closeModal.emit();
          this.showNotification.emit({ message: 'User created successfully!'});
        },
        error: (err) => {
          console.error('Error creating user:', err);
          this.showNotification.emit({message: 'Failed to create user. Please try again later.', status: 'error'});
        }
      });
    }
  };

  updateUser() {
    if (this.isFormUpdated()) {
      const updatedUserData = {
        user_id: this.userData?.user_id,
        department: this.department?.value,
        job_title: this.job_title?.value,
        updated_by: this.userName,
        accessible_tabs: this.accessible_tabs,
        accessible_forms: this.accessible_forms
      };

      this.userService.updateUser(updatedUserData).subscribe({
        next: (data) => {
          const index = this.userList.findIndex(user => user.user_id === this.userData?.user_id);
          if (index !== -1) {
            this.userList[index] = { ...this.userList[index], ...updatedUserData };
          }
          this.closeModal.emit();
          this.showNotification.emit({ message: 'User updated successfully!'});
        },
        error: (err) => {
          console.error('Error updating user:', err);
          this.notificationService.show('Failed to update user. Please try again later.');
        }
      });
    }
  };

  isFormUpdated(): boolean {

    const fieldsToCompare = [
      { formValue: this.department?.value, userData: this.userData?.department},
      { formValue: this.job_title?.value, userData: this.userData?.job_title}
    ];
    
    for (const field of fieldsToCompare) {
      if (field.formValue !== field.userData) {
        return true;
      }
    }

    if (this.accessible_tabs?.sort().toString() !== this.userData?.accessible_tabs?.sort().toString()) {
      return true;
    }

    if (this.accessible_forms?.sort().toString() !== this.userData?.accessible_forms?.sort().toString()) {
      return true;
    }

    return false;

  };

  cancel() {
    this.closeModal.emit();
  };

  onTabChange(tab: string, e: Event) {
    const checkbox = (e.target as HTMLInputElement);

    if (checkbox.checked && tab === 'Admin') {
      this.accessible_tabs = [...this.availableTabs];
      this.accessible_forms = [...this.availableForms];
      this.isUserAdmin = true;
    } else {
      this.isUserAdmin = false;
      if (checkbox.checked) {
        this.accessible_tabs.push(tab);
      } else {
        const index = this.accessible_tabs.indexOf(tab);
        if (index !== -1) {
          this.accessible_tabs.splice(index, 1);
        }
      }
    }
  };

  onFormChange(form: string, e: Event) {
    const checkbox = (e.target as HTMLInputElement);
    if (checkbox.checked) {
      this.accessible_forms.push(form);
    } else {
      const index = this.accessible_forms.indexOf(form);
      if (index !== -1) {
        this.accessible_forms.splice(index, 1);
      }
    }
  };

}
