import { Component, signal } from '@angular/core';
import { TableComponent } from '../shared/table/table.component';

@Component({
  selector: 'app-ventas-list',
  imports: [TableComponent],
  templateUrl: './ventas-list.component.html',
  styleUrl: './ventas-list.component.css',
})
export class VentasListComponent {
  columns = signal([
    { label: 'Nombre Producto', key: 'nombre' },
    { label: 'Descripción', key: 'descripcion' },
    { label: 'Precio', key: 'precio' },
    { label: 'Cantidad', key: 'cantidad' },
  ]);
}
