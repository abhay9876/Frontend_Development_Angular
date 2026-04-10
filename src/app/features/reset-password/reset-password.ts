import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword {
  resetForm: FormGroup;
  errorMessage: string = '';
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
  }
  onSubmit() {
    if (this.resetForm.invalid) {
      return;
    }
    this.errorMessage = '';
    const { newPassword, confirmPassword } = this.resetForm.value;
    if (newPassword !== confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    const payload = {
      token: this.token,
      newPassword: newPassword,
    };
    this.authService.resetPassword(payload).subscribe({
      next: () => {
        alert('Password updated successfully');
        this.router.navigateByUrl('');
      },
      error: (err) => {
        this.errorMessage = err.error || 'Something went wrong';
      },
    });
  }
}
