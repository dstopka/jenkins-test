import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-add-edit',
  templateUrl: './todo-add-edit.component.html',
  styleUrls: ['./todo-add-edit.component.scss']
})
export class TodoAddEditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formTitle: string;
  formContent: string;
  todoId: number;
  errorMessage: any;
  existingTodo: Todo;

  constructor(private TodoService: TodoService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formTitle = 'title';
    this.formContent = 'content';
    if (this.avRoute.snapshot.params[idParam]) {
      this.todoId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        todoId: 0,
        title: ['', [Validators.required]],
        content: ['', [Validators.required]],
      }
    )
  }

  ngOnInit() {

    if (this.todoId > 0) {
      this.actionType = 'Edit';
      this.TodoService.getTodo(this.todoId)
        .subscribe(data => (
          this.existingTodo = data,
          this.form.controls[this.formTitle].setValue(data.title),
          this.form.controls[this.formContent].setValue(data.content)
        ));
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      let todo: Todo = {
        title: this.form.get(this.formTitle)!.value,
        content: this.form.get(this.formContent)!.value
      };

      this.TodoService.saveTodo(todo)
        .subscribe((data) => {
          this.router.navigate(['/todos', data.todoId]);
        });
    }

    if (this.actionType === 'Edit') {
      let todo: Todo = {
        todoId: this.existingTodo.todoId,
        title: this.form.get(this.formTitle)!.value,
        content: this.form.get(this.formContent)!.value
      };
      this.TodoService.updateTodo(todo.todoId!, todo)
        .subscribe((data) => {
          this.router.navigate([this.router.url]);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get title() { return this.form.get(this.formTitle); }
  get content() { return this.form.get(this.formContent); }
}
