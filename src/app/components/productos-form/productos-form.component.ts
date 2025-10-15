import { Component } from '@angular/core';
import { ButtonsComponent } from '../shared/buttons/buttons.component';
import { InputsComponent } from '../shared/inputs/inputs.component';

@Component({
  selector: 'app-productos-form',
  imports: [InputsComponent, ButtonsComponent],
  templateUrl: './productos-form.component.html',
  styleUrl: './productos-form.component.css',
})
export class ProductosFormComponent {
  save() {
    alert('funciona');
  }
}
