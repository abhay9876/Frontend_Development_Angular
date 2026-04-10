import { Component, Output, Input, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar {
  @Input() collapsed: boolean = false;
  @Output() viewChanged = new EventEmitter<string>();
  activeView: string = 'notes';

  setView(view: string) {
    this.activeView = view;
    this.viewChanged.emit(view);
  }
}
