import { createReducer, on } from '@ngrx/store';
import { setFiltro, filtrosValidos } from './filtro.actions';


export const initialState:filtrosValidos = 'todos' as  filtrosValidos;

 const _filtroreducer = createReducer(initialState,
  on(setFiltro, (state,{filtro}) => filtro),
);

export function filtroreducer(state:any, action:any) {
  return _filtroreducer(state, action);
}

