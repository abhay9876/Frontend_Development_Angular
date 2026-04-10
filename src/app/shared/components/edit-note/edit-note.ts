import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteDto } from '../../models/note.dto';
import { Note } from '../../../core/services/note';

@Component({
  selector: 'app-edit-note',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-note.html',
  styleUrls: ['./edit-note.css'],
})
export class EditNoteComponent {
  @Input() note!: NoteDto;
  @Output() closeModal = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<void>();

  title = '';
  description = '';
  color = '';
  reminder: string | null = null;

  @ViewChild('colorPicker') colorPicker!: ElementRef<HTMLInputElement>;
  @ViewChild('reminderPicker') reminderPicker!: ElementRef<HTMLInputElement>;
  @ViewChild('imageUpload') imageUpload!: ElementRef<HTMLInputElement>;

  constructor(private noteService: Note) {}

  ngOnInit() {
    this.title = this.note.title;
    this.description = this.note.description || '';
    this.color = this.note.color || '';
    this.reminder = this.note.reminder || null;
  }

  updateNote() {
    const updated = {
      ...this.note,
      title: this.title,
      description: this.description,
      color: this.color === '#ffffff' ? '' : this.color,
      reminder: this.reminder,
    };

    this.noteService.updateNote(updated).subscribe(() => {
      this.note = { ...updated };
      this.refresh.emit();
    });
  }

  openColorPicker() {
    this.colorPicker.nativeElement.click();
  }

  onColorChange(event: Event) {
    this.color = (event.target as HTMLInputElement).value;
    this.updateNote();
  }

  openReminderPicker() {
    const input = this.reminderPicker.nativeElement;
    if (input.showPicker) {
      input.showPicker();
    } else {
      input.focus();
    }
  }

  onReminderChange(event: Event) {
    let val = (event.target as HTMLInputElement).value;
    this.reminder = val || null;
    this.updateNote();
  }

  removeReminder() {
    this.reminder = null;

    const updated = {
      ...this.note,
      reminder: null,
    };

    this.noteService.updateNote(updated).subscribe(() => {
      this.note = { ...updated };
      this.refresh.emit();
    });
  }

  openImageUpload() {
    this.imageUpload.nativeElement.click();
  }

  onImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      console.log('Image upload from modal:', file);
    }
  }

  close() {
    this.closeModal.emit();
  }
}
