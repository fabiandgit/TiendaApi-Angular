import { Component, input } from '@angular/core';

@Component({
  selector: 'app-inputs',
  imports: [],
  templateUrl: './inputs.component.html',
})
export class InputsComponent {
  type = input<string>('');
  nameLabel = input<string>('');
  inputId = input<string>('');
  class = input<string>('');
  classInput = input<string>('');
  placeHolder = input<string>('');
}
