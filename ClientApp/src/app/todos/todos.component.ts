import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos$: Observable<Todo[]> = new Observable<Todo[]>();

  constructor(private todosService: TodoService) {
  }

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todos$ = this.todosService.getTodos();
  }

  delete(todoId) {
    const ans = confirm('Do you want to delete blog post with id: ' + todoId);
    if (ans) {
      this.todosService.deleteTodo(todoId).subscribe((data) => {
        this.loadTodos();
      });
    }
  }

}
