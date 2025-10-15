import { Component } from '@angular/core';
import { InputsComponent } from '../shared/inputs/inputs.component';
import { ButtonsComponent } from '../shared/buttons/buttons.component';

@Component({
  selector: 'app-empleados-form',
  imports: [InputsComponent, ButtonsComponent],
  templateUrl: './empleados-form.component.html',
  styleUrl: './empleados-form.component.css',
})
export class EmpleadosFormComponent {
  save() {}
  //    public string Nombre { get; set; } = string.Empty;
  //  public string Apellido { get; set; } = string.Empty;
  //  public int Edad { get; set; }
  //  public string Email { get; set; } = string.Empty;
  //  public string Celular { get; set; } = string.Empty;
  //  public string Cargo { get; set; } = string.Empty;
  // public int Id { get; set; }
  // public int ProductoId { get; set; }
  // public string ProductoNombre { get; set; } = string.Empty;
  // public int EmpleadoId { get; set; }
  // public string EmpleadoNombre { get; set; } = string.Empty;
  // public int Cantidad { get; set; }
  // public decimal Total { get; set; }
  // public DateTime FechaVenta { get; set; }
}
