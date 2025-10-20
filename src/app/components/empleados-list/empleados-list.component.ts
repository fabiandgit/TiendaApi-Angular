import { Component, signal } from '@angular/core';
import { TableComponent } from '../shared/table/table.component';
import { Empleados } from '../../Models/Empleados.model';

@Component({
  selector: 'app-empleados-list',
  imports: [TableComponent],
  templateUrl: './empleados-list.component.html',
  styleUrl: './empleados-list.component.css',
})
export class EmpleadosListComponent {
  columns = signal([
    { label: 'Nombre', key: 'nombre' },
    { label: 'Apellido', key: 'apellido' },
    { label: 'Edad', key: 'edad' },
    { label: 'Celular', key: 'celular' },
    { label: 'Opciones', key: 'opciones' },
  ]);
  empleados = signal<Empleados[]>([]);
}
