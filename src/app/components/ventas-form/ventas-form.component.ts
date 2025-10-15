import { Component } from '@angular/core';
import { InputsComponent } from '../shared/inputs/inputs.component';
import { ButtonsComponent } from '../shared/buttons/buttons.component';

@Component({
  selector: 'app-ventas-form',
  imports: [InputsComponent, ButtonsComponent],
  templateUrl: './ventas-form.component.html',
  styleUrl: './ventas-form.component.css',
})
export class VentasFormComponent {
  save() {}
  // public string ProductoNombre { get; set; } = string.Empty;
  // public int EmpleadoId { get; set; }
  // public string EmpleadoNombre { get; set; } = string.Empty;
  // public int Cantidad { get; set; }
  // public decimal Total { get; set; }
  // public DateTime FechaVenta { get; set; }
}
