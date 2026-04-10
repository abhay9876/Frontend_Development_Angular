import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../../shared/models/task.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = environment.taskUrl;

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('auth_token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  createTask(task: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-task`, task, this.getHeaders());
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/getAllTasks`, this.getHeaders());
  }

  updateTask(id: number, task: any) {
    return this.http.put(`${this.baseUrl}/update/${id}`, task, this.getHeaders());
  }

  completeTask(id: number) {
    return this.http.put(`${this.baseUrl}/complete/${id}`, {}, this.getHeaders());
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, this.getHeaders());
  }

  getAdminTasks() {
    return this.http.get<any>('https://localhost:7156/api/admin/tasks', this.getHeaders());
  }
}
