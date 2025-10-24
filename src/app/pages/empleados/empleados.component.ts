import { Component, signal } from '@angular/core';
import { EmpleadosFormComponent } from '../../components/empleados-form/empleados-form.component';
import { EmpleadosListComponent } from '../../components/empleados-list/empleados-list.component';
import { Empleados } from '../../Models/Empleados.model';

@Component({
  selector: 'app-empleados',
  imports: [EmpleadosFormComponent, EmpleadosListComponent],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css',
})
export class EmpleadosComponent {
  empleadoSeleccionado = signal<Empleados | null>(null);

  cargarEmpleado(empleado: Empleados) {
    this.empleadoSeleccionado.set(empleado);
  }
}
