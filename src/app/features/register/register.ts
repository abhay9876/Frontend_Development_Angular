import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  registerForm: FormGroup;
  errorMessage: string = '';
  isOpen: boolean = false;
  selectedRole: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: Auth,
  ) {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
    });
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectRole(role: string) {
    this.selectedRole = role;
    this.isOpen = false;
    this.registerForm.patchValue({ role: role });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.errorMessage = '';

    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        const token = response.token;
        this.authService.setToken(token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigateByUrl('');
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed !';
      },
    });
  }
}
