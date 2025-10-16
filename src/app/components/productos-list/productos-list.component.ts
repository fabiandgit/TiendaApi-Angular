import { Component, signal } from '@angular/core';
import { TableComponent } from '../shared/table/table.component';

@Component({
  selector: 'app-productos-list',
  imports: [TableComponent],
  templateUrl: './productos-list.component.html',
  styleUrl: './productos-list.component.css',
})
export class ProductosListComponent {
  nameColumns = signal<string[]>([
    'Nombre Producto',
    'Descripcion',
    'Precio',
    'Cantidad',
    'opciones',
  ]);
  infoColumns = signal<string[]>(['']);
}
