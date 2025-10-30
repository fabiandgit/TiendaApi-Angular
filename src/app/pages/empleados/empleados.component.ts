import { Component, signal, ViewChild } from '@angular/core';
import { EmpleadosFormComponent } from '../../components/empleados-form/empleados-form.component';
import { EmpleadosListComponent } from '../../components/empleados-list/empleados-list.component';
import { Empleados } from '../../Models/Empleados.model';
import { HeaderComponent } from '../../components/shared/header/header.component';

@Component({
  selector: 'app-empleados',
  imports: [EmpleadosFormComponent, EmpleadosListComponent, HeaderComponent],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css',
})
export class EmpleadosComponent {
  @ViewChild('listaEmpleados') listaEmpleados!: EmpleadosListComponent;

  empleadoSeleccionado = signal<Empleados | null>(null);

  cargarEmpleado(empleado: Empleados) {
    this.empleadoSeleccionado.set(empleado);
  }

  recargarLista() {
    this.listaEmpleados.cargarEmpleados();
  }
}
