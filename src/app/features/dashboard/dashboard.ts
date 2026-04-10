import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TaskService } from '../../core/services/task';
import { Task } from '../../shared/models/task.model';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from '../../shared/components/create-task/create-task';
import { TaskCardComponent } from '../../shared/components/task-card/task-card';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CreateTaskComponent, TaskCardComponent, Navbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  isAdmin = false;
  constructor(
    private taskService: TaskService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.checkRole();
    this.loadTasks();
  }

  checkRole() {
    const role = localStorage.getItem('role');
    this.isAdmin = role === 'admin';
  }

  loadTasks() {
    if (this.isAdmin) {
      this.taskService.getAdminTasks().subscribe((res: any) => {
        this.tasks = res.data;
        this.cd.detectChanges();
      });
    } else {
      this.taskService.getTasks().subscribe((res: any) => {
        this.tasks = res.data;
        this.cd.detectChanges();
      });
    }
  }
}
