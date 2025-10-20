import { Component, input } from '@angular/core';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css',
})
export class ButtonsComponent {
  titleButton = input<string>(''); // Texto del botón
  typeButton = input<string>('button'); // Tipo (button, submit, etc)
  classButton = input<string>(''); // Clases personalizadas
  disabled = input<boolean>(false); // 👈 Nueva propiedad
}
