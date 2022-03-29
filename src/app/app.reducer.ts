import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { Todo } from './todos/models/todo.model';
import { todoReducer } from './todos/todo.reducer';
import { filtrosValidos } from './filtro/filtro.actions';
import { filtroreducer } from './filtro/filtro.reducer';

export interface AppState{
  todos: Todo[],
  filtro:filtrosValidos
}

export const appReducers: ActionReducerMap<AppState> = {
  todos: todoReducer,
  filtro:filtroreducer

}