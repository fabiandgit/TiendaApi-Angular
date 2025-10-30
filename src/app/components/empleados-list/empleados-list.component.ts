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
    { label: 'Cargo', key: 'cargo' },
    { label: 'Email', key: 'email' },
  ]);

  empleados = signal<Empleados[]>([]);
  editEmpleado = output<Empleados>();

  private empleadoService = inject(EmpleadoService);

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.empleadoService.getAll().subscribe({
      next: (data) => this.empleados.set(data),
      error: (err) => console.log('error al encontrar los empleados', err),
    });
  }

  onEdit(empleado: Empleados) {
    this.editEmpleado.emit(empleado);
  }
  onDelete(empleado: Empleados) {
    if (confirm(`¿Deseas eliminar a ${empleado.nombre}?`)) {
      this.empleadoService.deleteEmpleado(empleado.id).subscribe({
        next: () => {
          const actual = this.empleados().filter((e) => e.id !== empleado.id);
          this.empleados.set(actual);
          alert('Empleado eliminado correctamente ✅');
        },
        error: (err) => console.log('error al eliminar el empleado', err),
      });
    }
  }
}
