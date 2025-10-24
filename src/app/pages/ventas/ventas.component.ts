import { Component, signal } from '@angular/core';
import { VentasFormComponent } from '../../components/ventas-form/ventas-form.component';
import { VentasListComponent } from '../../components/ventas-list/ventas-list.component';
import { Ventas } from '../../Models/Ventas.model';

@Component({
  selector: 'app-ventas',
  imports: [VentasFormComponent, VentasListComponent],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css',
})
export class VentasComponent {
  ventaSeleccionada = signal<Ventas | null>(null);

  mostrarVentaSeleccionada(venta: Ventas) {
    this.ventaSeleccionada.set(venta);
  }
}
