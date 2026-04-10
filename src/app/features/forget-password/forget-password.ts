import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-forget-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.scss',
})
export class ForgetPassword {
  forgetForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.forgetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.forgetForm.invalid) {
      return;
    }
    this.errorMessage = '';

    this.authService.forgetPassword(this.forgetForm.value).subscribe({
      next: (response) => {
        this.router.navigateByUrl('');
      },
      error: (err) => {
        this.errorMessage = err.error?.message;
        alert(this.errorMessage);
      },
    });
  }
}
