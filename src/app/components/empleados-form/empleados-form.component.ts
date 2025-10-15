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
}
