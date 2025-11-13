import { Component, inject, OnInit, output, signal } from '@angular/core';
import { TableComponent } from '../shared/table/table.component';
import { Empleados } from '../../Models/Empleados.model';
import { EmpleadoService } from '../../services/empleado.service';
import { ToastrService } from 'ngx-toastr';

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
  totalItems = signal<number>(0);
  page = signal<number>(1);
  pageSize = signal<number>(10);
  editEmpleado = output<Empleados>();

  private empleadoService = inject(EmpleadoService);
  private toast = inject(ToastrService);

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    // this.empleadoService.getAll().subscribe({
    //   next: (data) => this.empleados.set(data),
    //   error: (err) => this.toast.error('error al encontrar los empleados', err),
    // });
    this.empleadoService
      .getEmpleadosPaginados(this.page(), this.pageSize())
      .subscribe({
        next: (data) => {
          this.empleados.set(data.items), this.totalItems.set(data.totalCount);
        },
        error: (err) =>
          this.toast.error('Error al encontrar los empleados', err),
      });
  }

  cambiarPagina(nuevaPagina: number) {
    this.page.set(nuevaPagina);
    this.cargarEmpleados();
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems() / this.pageSize());
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
