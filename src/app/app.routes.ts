import { Routes } from '@angular/router';
//import { Home } from './shared/components/home/home';
import { Login } from './shared/components/login/login';
import { Register } from './shared/components/register/register';
import { Dashboard } from './features/dashboard/dashboard';
import { authGuard } from './core/guards/auth-guard';
import { ForgetPassword } from './features/forget-password/forget-password';
import { ResetPassword } from './features/reset-password/reset-password';

export const routes: Routes = [
  // { path: '', component: Home },
  { path: '', component: Login },
  { path: 'register', component: Register },
  { path: 'forget-password', component: ForgetPassword },
  { path: 'reset-password', component: ResetPassword },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' },
];
