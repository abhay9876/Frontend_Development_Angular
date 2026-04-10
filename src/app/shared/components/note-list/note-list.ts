import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteCardComponent } from '../note-card/note-card';
import { Note } from '../../../core/services/note';
import { NoteDto } from '../../models/note.dto';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, NoteCardComponent],
  templateUrl: './note-list.html',
  styleUrls: ['./note-list.css'],
})
export class NoteListComponent {
  @Input() notes: NoteDto[] = [];
  @Input() viewType: string = 'notes'; // 'notes', 'archive', 'trash'
  @Input() viewMode: string = 'grid';
  @Output() refresh = new EventEmitter<void>();
}
