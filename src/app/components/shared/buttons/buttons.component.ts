import { Component, input } from '@angular/core';

@Component({
  selector: 'app-buttons',
  imports: [],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css',
})
export class ButtonsComponent {
  titleButton = input<string>('');
  typeButton = input<string>('');
  classButton = input<string>('');
}
