import { Component } from '@angular/core';
import { VentasFormComponent } from '../../components/ventas-form/ventas-form.component';
import { VentasListComponent } from '../../components/ventas-list/ventas-list.component';

@Component({
  selector: 'app-ventas',
  imports: [VentasFormComponent, VentasListComponent],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css',
})
export class VentasComponent {}
