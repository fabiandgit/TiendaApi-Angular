import {
  Component,
  effect,
  inject,
  input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputsComponent } from '../shared/inputs/inputs.component';
import { ButtonsComponent } from '../shared/buttons/buttons.component';
import { Empleados } from '../../Models/Empleados.model';
import { EmpleadoService } from '../../services/empleado.service';
import { SelectsComponent } from '../shared/selects/selects.component';

@Component({
  selector: 'app-empleados-form',
  imports: [
    InputsComponent,
    ButtonsComponent,
    SelectsComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './empleados-form.component.html',
  styleUrl: './empleados-form.component.css',
})
export class EmpleadosFormComponent implements OnChanges {
  empleadoSeleccionado = input<Empleados | null>(null);
  empleadoPendiente = input<Empleados | null>(null);
  cargoNombre = input([
    { name: 'Mexico', value: 'Colombia' },
    { name: 'Mexico', value: 'Mexico' },
    { name: 'Japon', value: 'Japon' },
  ]);

  private fb = inject(FormBuilder);
  private empleadoService = inject(EmpleadoService);

  form: FormGroup = this.fb.group({
    id: [0],
    nameEmployee: ['', Validators.required],
    lasNameEmployee: ['', Validators.required],
    ageEmployee: ['', Validators.required],
    phone: [0, [Validators.required, Validators.min(0)]],
    position: ['', Validators.required],
  });

  //se podria utilizar en reemplazo del ngOnchange
  // constructor() {
  //   effect(() => {
  //     const empleado = this.empleadoSeleccionado();
  //     if (empleado) {
  //       this.form.patchValue(empleado);
  //     }
  //   });
  // }

  //   ngOnInit(): void {
  //   effect(() => {
  //     const empleado = this.empleadoSeleccionado();
  //     if (empleado) {
  //       this.form.patchValue(empleado);
  //     }
  //   });

  //   const pendiente = this.empleadoPendiente();
  //   if (pendiente) {
  //     this.form.patchValue(pendiente);
  //   }
  // }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['empleadoSeleccionado']) {
      const empleado = this.empleadoSeleccionado();
      if (empleado) {
        this.form.patchValue(empleado);
      }
    }
  }

  ngOnInit(): void {
    const pendiente = this.empleadoPendiente();
    if (pendiente) {
      this.form.patchValue(pendiente);
    }
  }

  saveEmplado() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const empleado = this.form.value as Empleados;
    if (empleado.id && empleado.id > 0) {
      this.empleadoService.updateEmpleado(empleado.id, empleado).subscribe({
        next: () => {
          alert('Producto actualizado correctamente ✅');
          this.resetForm();
        },
        error: (err) => console.error('Error al actualizar producto:', err),
      });
    } else {
      this.empleadoService.saveEmpleado(empleado).subscribe({
        next: () => {
          alert('Producto creado correctamente ✅');
          this.resetForm();
        },
        error: (err) => console.error('Error al crear producto:', err),
      });
    }
  }
  resetForm() {
    this.form.reset({
      id: 0,
      nameEmployee: '',
      lasNameEmployee: '',
      phone: 0,
      ageEmployee: '',
      position: '',
    });
  }
}
