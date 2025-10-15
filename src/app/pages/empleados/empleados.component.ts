import { Component } from '@angular/core';
import { EmpleadosFormComponent } from '../../components/empleados-form/empleados-form.component';
import { EmpleadosListComponent } from '../../components/empleados-list/empleados-list.component';

@Component({
  selector: 'app-empleados',
  imports: [EmpleadosFormComponent, EmpleadosListComponent],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css',
})
export class EmpleadosComponent {}
