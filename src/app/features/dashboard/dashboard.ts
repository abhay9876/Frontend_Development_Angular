import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../shared/components/header/header';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { CreateNoteComponent } from '../../shared/components/create-note/create-note';
import { NoteListComponent } from '../../shared/components/note-list/note-list';
import { NoteDto } from '../../shared/models/note.dto';
import { Note } from '../../core/services/note';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, Header, Sidebar, CreateNoteComponent, NoteListComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard implements OnInit {
  notes: NoteDto[] = [];
  currentView: string = 'notes';
  originalNotes: NoteDto[] = [];
  searchTerm: string = '';
  sidebarOpen: boolean = true;
  viewMode: string = 'grid';
  sidebarCollapsed = false;

  constructor(
    private noteService: Note,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadNotes();
  }

  toggleSidebar() {
    if (window.innerWidth < 768) {
      this.sidebarOpen = !this.sidebarOpen;
    } else {
      this.sidebarCollapsed = !this.sidebarCollapsed; 
    }
  }
  onToggleView(mode: string) {
    this.viewMode = mode;
  }
  onViewChange(view: string) {
    this.currentView = view;
    this.loadNotes();
  }

  loadNotes() {
    if (this.currentView === 'archive') {
      this.noteService.getArchivedNotes().subscribe({
        next: (res: any) => {
          this.originalNotes = res.data;
          this.notes = this.sortPinnedFirst(this.filterNotes(this.originalNotes));
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Archive error:', err),
      });
    } else if (this.currentView === 'trash') {
      this.noteService.getTrashedNotes().subscribe({
        next: (res: any) => {
          this.originalNotes = res.data;
          this.notes = this.sortPinnedFirst(this.filterNotes(this.originalNotes));
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Trash error:', err),
      });
    } else if (this.currentView === 'reminders') {
      this.noteService.getAllNotes().subscribe({
        next: (res: any) => {
          const allNotes = res.data;
          const reminderNotes = allNotes.filter(
            (note: any) => note.reminder != null && note.reminder !== '',
          );
          this.originalNotes = reminderNotes;
          this.notes = this.sortPinnedFirst(this.filterNotes(this.originalNotes));
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Reminders error:', err),
      });
    } else {
      this.noteService.getAllNotes().subscribe({
        next: (res: any) => {
          this.originalNotes = res.data;
          this.notes = this.sortPinnedFirst(this.filterNotes(this.originalNotes));
          console.log(this.notes);
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Fetch error:', err),
      });
    }
  }

  // Called from header search
  onSearch(term: string) {
    this.searchTerm = term;
    this.notes = this.sortPinnedFirst(this.filterNotes(this.originalNotes));
    this.cdr.detectChanges();
  }

  //Filter notes by title/description
  private filterNotes(notes: NoteDto[]): NoteDto[] {
    if (!this.searchTerm) return notes;
    const term = this.searchTerm.toLowerCase();
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(term) || note.description.toLowerCase().includes(term),
    );
  }

  // Sort pinned notes first, then others (preserve original order)
  private sortPinnedFirst(notes: NoteDto[]): NoteDto[] {
    return [...notes].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });
  }
}
