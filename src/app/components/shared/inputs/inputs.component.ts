import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-inputs',
  standalone: true,
  templateUrl: './inputs.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputsComponent),
      multi: true,
    },
  ],
})
export class InputsComponent implements ControlValueAccessor {
  type = input<string>('text');
  nameLabel = input<string>('');
  inputId = input<string>('');
  class = input<string>('block mb-2 text-sm font-medium text-gray-900');
  classInput = input<string>(
    'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
  );
  placeHolder = input<string>('');
  isDisabledInput = input<boolean>(false); // valor externo
  isDisabledInternal = signal<boolean>(false); // valor interno

  // Estas propiedades permiten que el input comunique su valor al FormControl
  value: any = '';
  onChange = (value: any) => {};
  onTouched = () => {};

  // Métodos requeridos por ControlValueAccessor
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabledInternal.set(isDisabled);
  }

  handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }
}
