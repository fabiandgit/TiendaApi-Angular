import { Component, signal, ViewChild } from '@angular/core';
import { ProductosListComponent } from '../../components/productos-list/productos-list.component';
import { ProductosFormComponent } from '../../components/productos-form/productos-form.component';
import { Productos } from '../../Models/Productos.model';

@Component({
  selector: 'app-productos',
  imports: [ProductosListComponent, ProductosFormComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {
  productoSeleccionado = signal<Productos | null>(null);

  // Referencia al listado para poder recargar
  @ViewChild(ProductosListComponent) listaComponent!: ProductosListComponent;

  onProductoSeleccionado(producto: Productos) {
    this.productoSeleccionado.set(producto);
  }

  onProductoGuardado() {
    this.listaComponent.cargarProductos(); // 🟢 Recarga lista automáticamente
    this.productoSeleccionado.set(null); // Limpia selección
  }

  onProductoEliminado() {
    this.listaComponent.cargarProductos(); // 🟢 También recarga al eliminar
  }
}
