import { Component, signal } from '@angular/core';
import { TableComponent } from '../shared/table/table.component';

@Component({
  selector: 'app-empleados-list',
  imports: [TableComponent],
  templateUrl: './empleados-list.component.html',
  styleUrl: './empleados-list.component.css',
})
export class EmpleadosListComponent {
  // employee = signal(['Nombre', 'Apellido', 'Edad', 'Celular', 'Cargo']);
  employee = signal(['Nombre', 'Apellido', 'Edad', 'Celular']);
}
