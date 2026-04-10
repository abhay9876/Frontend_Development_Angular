import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteDto } from '../../../shared/models/note.dto';
import { Note } from '../../../core/services/note';
import { EditNoteComponent } from '../edit-note/edit-note';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CommonModule, EditNoteComponent],
  templateUrl: './note-card.html',
  styleUrls: ['./note-card.css'],
})
export class NoteCardComponent implements AfterViewInit {
  @Input() note!: NoteDto;
  @Input() viewType: string = 'notes';
  @Output() refresh = new EventEmitter<void>();

  showEditModal = false;

  @ViewChild('colorPicker') colorPicker!: ElementRef<HTMLInputElement>;
  @ViewChild('reminderPicker') reminderPicker!: ElementRef<HTMLInputElement>;
  @ViewChild('imageUpload') imageUpload!: ElementRef<HTMLInputElement>;

  constructor(
    private noteService: Note,
    private cd: ChangeDetectorRef,
  ) {}

  ngAfterViewInit() {}

  openEditModal() {
    this.showEditModal = true;
  }

  onModalClose() {
    this.showEditModal = false;
    this.refresh.emit();
  }

  openColorPicker(event: Event) {
    event.stopPropagation();
    this.colorPicker.nativeElement.click();
  }

  onColorChange(event: Event) {
    event.stopPropagation();
    const color = (event.target as HTMLInputElement).value;
    const updatedNote = { ...this.note, color: color === '#ffffff' ? '' : color };
    this.noteService.updateNote(updatedNote).subscribe(() => this.refresh.emit());
  }

  openReminderPicker(event: Event) {
    event.stopPropagation();
    const input = this.reminderPicker.nativeElement;

    if (input.showPicker) {
      input.showPicker();
    } else {
      input.focus();
    }
  }

  onReminderChange(event: Event) {
    event.stopPropagation();

    let value = (event.target as HTMLInputElement).value;

    const reminder = value ? value : null;

    const updatedNote = {
      ...this.note,
      reminder: reminder,
    };

    this.noteService.updateNote(updatedNote).subscribe(() => {
      this.note = { ...updatedNote };
      this.refresh.emit();
    });
  }

  removeReminder(event: Event) {
    event.stopPropagation();

    const updatedNote = {
      ...this.note,
      reminder: null,
    };
    console.log('Sending to backend:', updatedNote);
    this.noteService.updateNote(updatedNote).subscribe((res) => {
      console.log('Response from backend:', res);
      this.note = { ...updatedNote };
      this.refresh.emit();
    });
  }
  openImageUpload(event: Event) {
    event.stopPropagation();
    this.imageUpload.nativeElement.click();
  }

  onImageUpload(event: Event) {
    event.stopPropagation();
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      console.log('Image selected:', file.name);
    }
  }

  onArchive(event: Event) {
    event.stopPropagation();
    this.noteService.archiveNote(this.note.id!).subscribe(() => this.refresh.emit());
  }

  onUnarchive(event: Event) {
    event.stopPropagation();
    this.noteService.unarchiveNote(this.note.id!).subscribe(() => this.refresh.emit());
  }

  onTrash(event: Event) {
    event.stopPropagation();
    this.noteService.trashNote(this.note.id!).subscribe(() => this.refresh.emit());
  }

  onRestore(event: Event) {
    event.stopPropagation();
    this.noteService.restoreNote(this.note.id!).subscribe(() => this.refresh.emit());
  }

  onDeletePermanently(event: Event) {
    event.stopPropagation();
    if (confirm('Delete permanently?')) {
      this.noteService.deleteNote(this.note.id!).subscribe(() => this.refresh.emit());
    }
  }

  onTogglePin(event: Event) {
    event.stopPropagation();
    const updatedNote = { ...this.note, isPinned: !this.note.isPinned };
    this.noteService.updateNote(updatedNote).subscribe({
      next: () => this.refresh.emit(),
      error: (err) => console.error('Pin toggle error:', err),
    });
  }
}
