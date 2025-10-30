import { Component, OnInit, signal, inject, output } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Productos } from '../../Models/Productos.model';
import { TableComponent } from '../shared/table/table.component';

@Component({
  selector: 'app-productos-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './productos-list.component.html',
  styleUrl: './productos-list.component.css',
})
export class ProductosListComponent implements OnInit {
  private productoService = inject(ProductoService);

  productos = signal<Productos[]>([]);

  // 🔹 Nuevo: evento para comunicar al padre el producto seleccionado
  edit = output<Productos>();
  deleted = output<void>();
  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe({
      next: (data) => this.productos.set(data),
      error: (err) => console.error('Error cargando productos', err),
    });
  }

  onEdit(producto: Productos) {
    // 🔹 En vez de manejarlo internamente, lo emitimos al padre
    this.edit.emit(producto);
  }

  onDelete(producto: Productos) {
    if (confirm(`¿Seguro que deseas eliminar "${producto.nombre}"?`)) {
      this.productoService.deleteProducto(producto.id).subscribe({
        next: () => {
          this.cargarProductos(), this.deleted.emit();
        },
        error: (err) => console.error('Error eliminando producto', err),
      });
    }
  }
}
