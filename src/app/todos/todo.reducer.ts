import { createReducer, on } from '@ngrx/store';
import { crear, toggle, editar, borrar, limpiarTodos } from './todo.actions';
import { Todo } from './models/todo.model';
import { filter } from 'rxjs/operators';

 
export const estadoInicial: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Vencer a thanos'),
  new Todo('comprar traje de iromman '),
  new Todo('robar al capitan america')
];
 
const _todoReducer = createReducer(
  estadoInicial,
  on(limpiarTodos, state => state.filter(todo => !todo.completado)),
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(borrar,(state,{id})=> state.filter(todo => todo.id !== id)),
  on(toggle, (state, { id }) => {
    
    return state.map(todo => { 
      if (todo.id === id) {
        return {
          ...todo!,
          completado: !todo.completado
         }  
      } else {
        return todo;
      }
      
    })
  }),
  on(editar, (state, { id,texto }) => {
    
    return state.map(todo => { 
      if (todo.id === id) {
        return {
          ...todo!,
          texto:texto
         }  
      } else {
        return todo;
      }
      
    })
  })
);
 
export function todoReducer(state:any, action:any) {
  return _todoReducer(state, action);
}