import { Component, effect, inject, input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputsComponent } from '../shared/inputs/inputs.component';
import { ButtonsComponent } from '../shared/buttons/buttons.component';
import { Empleados } from '../../Models/Empleados.model';
import { EmpleadoService } from '../../services/empleado.service';
import { SelectsComponent } from '../shared/selects/selects.component';

@Component({
  selector: 'app-empleados-form',
  imports: [
    InputsComponent,
    ButtonsComponent,
    SelectsComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './empleados-form.component.html',
  styleUrl: './empleados-form.component.css',
})
export class EmpleadosFormComponent {
  empleadoSeleccionado = input<Empleados | null>(null);
  cargoNombre = input([
    { name: 'Colombia', value: 'Colombia' },
    { name: 'Mexico', value: 'Mexico' },
    { name: 'Japon', value: 'Japon' },
  ]);

  private fb = inject(FormBuilder);
  private empleadoService = inject(EmpleadoService);

  form: FormGroup = this.fb.group({
    id: [0],
    nameEmployee: ['', Validators.required],
    lasNameEmployee: ['', Validators.required],
    ageEmployee: ['', Validators.required],
    phone: [0, [Validators.required, Validators.min(0)]],
    position: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      const empleado = this.empleadoSeleccionado();
      if (empleado) {
        this.form.patchValue(empleado);
      }
    });
  }
  saveEmplado() {}
}
