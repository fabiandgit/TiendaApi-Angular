import { Component, signal } from '@angular/core';
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
  // 🟢 El producto seleccionado para editar
  productoSeleccionado = signal<Productos | null>(null);

  onProductoSeleccionado(producto: Productos) {
    this.productoSeleccionado.set(producto);
    console.log('Producto para editar:', producto);
  }
}
