import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    resetForm!: FormGroup;
    successMessage: string | null = null;
    errorMessage: string | null = null;

    constructor(private fb: FormBuilder, private authService: AuthService) { }

    ngOnInit(): void {
        this.resetForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    get email() {
        return this.resetForm.get('email');
    }

    onReset() {
        if (this.resetForm.valid) {
            const email = this.resetForm.value.email;

            this.authService.requestPasswordReset(email).subscribe(response => {
                if (response.success) {
                    this.successMessage = 'Reset link sent to your email.';
                    this.errorMessage = null;
                } else {
                    this.errorMessage = 'Failed to send reset link.';
                    this.successMessage = null;
                }
            });
        }
    }
}