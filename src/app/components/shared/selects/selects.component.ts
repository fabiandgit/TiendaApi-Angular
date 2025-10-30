import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-selects',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectsComponent),
      multi: true,
    },
  ],
  templateUrl: './selects.component.html',
  styleUrl: './selects.component.css',
})
export class SelectsComponent implements ControlValueAccessor {
  selectId = input('');
  optionOne = input('');
  classLabel = input<string>('block mb-2 text-sm font-medium text-gray-900');
  labelName = input<string>();
  classSelect = input<string>(
    'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
  );
  selectValues = input<any>([]);

  value: any = '';

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleChange(value: Event) {
    const input = value.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }
}
