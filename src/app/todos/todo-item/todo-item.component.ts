import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validator, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo!: Todo;
  @ViewChild('txtinputFisico') txtinputFisico!: ElementRef;
  constructor(private store:Store<AppState>) { }

  chkcompletado!: FormControl;
  txtInput!: FormControl;
  editando = false;


  ngOnInit(): void {
    // this.todo.completado = true;
    this.chkcompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);
    this.chkcompletado.valueChanges.subscribe(valor => {
      this.store.dispatch(actions.toggle({ id: this.todo.id }));
    });

  }

  editar() {
    this.editando = true;
    this.txtInput.setValue(this.todo.texto);
    setTimeout(() => {
      this.txtinputFisico.nativeElement.select();
    }, 1)
  
  }

  terminarEdicion() {
    this.editando = false;
    
    if (this.txtInput.invalid) {
      return;
    }

    if (this.txtInput.value === this.todo.texto) {
      return;
    }
    
    this.store.dispatch(actions.editar({
      id: this.todo.id,
      texto: this.txtInput.value
    }));

  }

  borrar() {
    this.store.dispatch(actions.borrar({ id: this.todo.id }));
  }

}
