import { Component, inject, OnInit, output, signal } from '@angular/core';
import { TableComponent } from '../shared/table/table.component';
import { Empleados } from '../../Models/Empleados.model';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-empleados-list',
  imports: [TableComponent],
  templateUrl: './empleados-list.component.html',
  styleUrl: './empleados-list.component.css',
})
export class EmpleadosListComponent implements OnInit {
  columns = signal([
    { label: 'Nombre', key: 'nombre' },
    { label: 'Apellido', key: 'apellido' },
    { label: 'Edad', key: 'edad' },
    { label: 'Celular', key: 'celular' },
    { label: 'Opciones', key: 'opciones' },
  ]);

  empleado = signal<Empleados[]>([]);
  editEmpleado = output<Empleados>();

  private empleadoService = inject(EmpleadoService);

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.empleadoService.getAll().subscribe({
      next: (data) => this.empleado.set(data),
      error: (err) => console.log('error al encontrar los empleados', err),
    });
  }

  onEdit(empleado: Empleados) {
    this.editEmpleado.emit(empleado);
  }
  onDelete(empleado: Empleados) {
    if (confirm('DEsea eliminar este empleado?')) {
      this.empleadoService.deleteEmpleado(empleado.id).subscribe({
        next: () => this.cargarEmpleados(),
        error: (err) => console.log('error al eliminar el empleado', err),
      });
    }
  }
}
