import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { NoteDto } from '../../shared/models/note.dto';
@Injectable({
  providedIn: 'root',
})
export class Note {
  private notesUrl = environment.noteApiUrl;
  isArchived: any;

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getAllNotes() {
    return this.http.get(`${this.notesUrl}/get-all-notes`, this.getHeaders());
  }

  getNoteById(id: number) {
    return this.http.get(`${this.notesUrl}/get-note-by-id/${id}`);
  }

  createNote(data: NoteDto) {
    return this.http.post(`${this.notesUrl}/create-note`, data, this.getHeaders());
  }

  updateNote(data: NoteDto) {
    return this.http.put(`${this.notesUrl}/update-note/${data.id}`, data, this.getHeaders());
  }

  deleteNote(id: number) {
    return this.http.delete(`${this.notesUrl}/delete/${id}`, this.getHeaders());
  }

  archiveNote(id: number) {
    return this.http.put(`${this.notesUrl}/${id}/archive`, {}, this.getHeaders());
  }

  unarchiveNote(id: number) {
    return this.http.put(`${this.notesUrl}/${id}/unarchive`, {}, this.getHeaders());
  }

  trashNote(id: number) {
    return this.http.put(`${this.notesUrl}/${id}/trash`, {}, this.getHeaders());
  }

  restoreNote(id: number) {
    return this.http.put(`${this.notesUrl}/${id}/restore`, {}, this.getHeaders());
  }

  getArchivedNotes() {
    return this.http.get(`${this.notesUrl}/archived`, this.getHeaders());
  }

  getTrashedNotes() {
    return this.http.get(`${this.notesUrl}/trashed`, this.getHeaders());
  }
}
