import { Component, inject, input } from '@angular/core';
import { InputsComponent } from '../shared/inputs/inputs.component';
import { ButtonsComponent } from '../shared/buttons/buttons.component';
import { Empleados } from '../../Models/Empleados.model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-empleados-form',
  imports: [InputsComponent, ButtonsComponent],
  templateUrl: './empleados-form.component.html',
  styleUrl: './empleados-form.component.css',
})
export class EmpleadosFormComponent {
  saveEmployee = input<Empleados>();

  private fb = inject(FormBuilder);

  save() {}
}
