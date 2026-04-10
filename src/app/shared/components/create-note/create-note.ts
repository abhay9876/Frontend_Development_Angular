import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note } from '../../../core/services/note';

@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-note.html',
  styleUrls: ['./create-note.css'],
})
export class CreateNoteComponent {
  expanded = false;
  title = '';
  description = '';
  color = '#ffffff';
  reminder = '';
  @Output() noteCreated = new EventEmitter<void>();

  constructor(private noteService: Note) {}

  expandNote() {
    this.expanded = true;
  }

  closeNote(event: Event) {
    event.stopPropagation();
    if (this.title.trim() || this.description.trim()) {
      const payload = {
        title: this.title.trim(),
        description: this.description.trim(),
        color: this.color === '#ffffff' ? '' : this.color,
        image: '',
        reminder: this.reminder || null,
      };
      this.noteService.createNote(payload).subscribe({
        next: () => {
          this.noteCreated.emit();
          this.reset();
        },
        error: (err) => console.error('Create error:', err),
      });
    } else {
      this.reset();
    }
  }

  reset() {
    this.title = '';
    this.description = '';
    this.color = '#ffffff';
    this.reminder = '';
    this.expanded = false;
  }
}
