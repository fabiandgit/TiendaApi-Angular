import { Component, inject, OnInit, output, signal } from '@angular/core';
import { TableComponent } from '../shared/table/table.component';
import { Ventas } from '../../Models/Ventas.model';
import { VentasService } from '../../services/ventas.service';

@Component({
  selector: 'app-ventas-list',
  imports: [TableComponent],
  templateUrl: './ventas-list.component.html',
  styleUrl: './ventas-list.component.css',
})
export class VentasListComponent implements OnInit {
  columns = signal([
    { label: 'Nombre Producto', key: 'productoNombre' },
    { label: 'Empleado', key: 'empleadoNombre' },
    { label: 'Cantidad', key: 'cantidad' },
    { label: 'Total', key: 'total' },
  ]);
  ventas = signal<Ventas[]>([]);
  editVenta = output<Ventas>();

  private ventasService = inject(VentasService);

  ngOnInit(): void {
    this.cargarVentas();
  }

  cargarVentas() {
    this.ventasService.getAll().subscribe({
      next: (data) => this.ventas.set(data),
      error: (err) => console.log('error al encontrar las ventas', err),
    });
  }

  onEdit(venta: Ventas) {
    this.editVenta.emit(venta);
  }

  onDelete(venta: Ventas) {
    if (confirm('Seguro quieres eliminar esta venta?')) {
      this.ventasService.deleteVenta(venta.id).subscribe({
        next: () => this.cargarVentas(),
        error: (err) => console.log('No se pudo eliminar la venta', err),
      });
    }
  }
}
