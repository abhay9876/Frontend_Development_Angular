import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../../core/services/task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Input() isAdmin: boolean = false;

  @Output() refresh = new EventEmitter<void>();

  isEditing = false;

  constructor(
    private taskService: TaskService,
    private cd: ChangeDetectorRef,
  ) {}

  toggleComplete() {
    this.taskService.completeTask(this.task.id).subscribe(() => {
      this.refresh.emit();
      this.cd.detectChanges();
    });
  }

  deleteTask() {
    this.taskService.deleteTask(this.task.id).subscribe(() => {
      this.refresh.emit();
      this.cd.detectChanges();
    });
  }

  updateTask() {
    this.taskService.updateTask(this.task.id, this.task).subscribe(() => {
      this.isEditing = false;
      this.refresh.emit();
      this.cd.detectChanges();
    });
  }
}
