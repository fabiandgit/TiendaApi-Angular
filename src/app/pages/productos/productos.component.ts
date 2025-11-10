import { Component, signal, ViewChild } from '@angular/core';
import { ProductosListComponent } from '../../components/productos-list/productos-list.component';
import { ProductosFormComponent } from '../../components/productos-form/productos-form.component';
import { Productos } from '../../Models/Productos.model';
import { HeaderComponent } from '../../components/shared/header/header.component';

@Component({
  selector: 'app-productos',
  imports: [ProductosListComponent, ProductosFormComponent, HeaderComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {
  productoSeleccionado = signal<Productos | null>(null);
  title = signal<string>('Agregar');

  // Referencia al listado para poder recargar
  @ViewChild(ProductosListComponent) listaComponent!: ProductosListComponent;

  onProductoSeleccionado(producto: Productos) {
    this.productoSeleccionado.set(producto);
    this.title.set('Editar');
  }

  onProductoGuardado() {
    this.listaComponent.cargarProductos(); // 🟢 Recarga lista automáticamente
    this.productoSeleccionado.set(null); // Limpia selección
    this.title.set('Agregar');
  }

  onProductoEliminado() {
    this.listaComponent.cargarProductos(); // 🟢 También recarga al eliminar
  }
}
