import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { TodoComponent } from './todo/todo.component';
import { TodoAddEditComponent } from './todo-add-edit/todo-add-edit.component';

const routes: Routes = [
  { path: 'todos', component: TodosComponent, pathMatch: 'full'},
  { path: 'todos/:id', component: TodoComponent },
  { path: 'add', component: TodoAddEditComponent },
  { path: 'todo/edit/:id', component: TodoAddEditComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
