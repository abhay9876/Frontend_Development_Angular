import { Component, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  @Output() search = new EventEmitter<string>();
  @Output() refresh = new EventEmitter<void>();
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() toggleView = new EventEmitter<string>();

  userName: string = '';
  showDropdown = false;
  viewMode: string = 'grid';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user.name || user.email || 'User';
  }

  @HostListener('document:click')
  closeDropdown() {
    this.showDropdown = false;
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  logout(event: Event) {
    event.stopPropagation();
    this.authService.logout();
    this.router.navigateByUrl('');
  }

  onSearch(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.search.emit(term);
  }

  onRefresh() {
    this.refresh.emit();
  }
  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  onToggleView() {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
    this.toggleView.emit(this.viewMode);
  }
}
