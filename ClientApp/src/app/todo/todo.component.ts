import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todo$: Observable<Todo> = EMPTY;
  todoId: number;

  constructor(private todoService: TodoService, private avRoute: ActivatedRoute) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.todoId = this.avRoute.snapshot.params[idParam];
    }
  }

  ngOnInit() {
    this.loadTodo();
  }

  loadTodo() {
    this.todo$ = this.todoService.getTodo(this.todoId);
  }

}
