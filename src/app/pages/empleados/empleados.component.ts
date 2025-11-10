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
  title = signal<string>('Agregar');

  cargarEmpleado(empleado: Empleados) {
    this.empleadoSeleccionado.set(empleado);
    this.title.set('Editar');
  }

  recargarLista() {
    console.log(this.title());
    this.title.set('Agregar');
    this.listaEmpleados.cargarEmpleados();
  }
}
