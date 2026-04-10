import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginDTO } from '../../shared/models/login.dto';
import { RegisterDTO } from '../../shared/models/register.dto';
import { ForgetPasswordDTO } from '../../shared/models/forgetPassword.dto';
import { ResetPasswordDTO } from '../../shared/models/resetPassword.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: LoginDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/User/login`, credentials);
  }

  register(user: RegisterDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/User/register`, user);
  }

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }

  forgetPassword(credential: ForgetPasswordDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/User/forgot-password`, credential);
  }

  resetPassword(credential: ResetPasswordDTO) {
    return this.http.post(`${this.apiUrl}/User/reset-password`, credential);
  }
}
