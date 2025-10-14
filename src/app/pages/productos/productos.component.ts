import { Component } from '@angular/core';
import { ProductosListComponent } from '../../components/productos-list/productos-list.component';
import { ProductosFormComponent } from '../../components/productos-form/productos-form.component';

@Component({
  selector: 'app-productos',
  imports: [ProductosListComponent, ProductosFormComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {}
