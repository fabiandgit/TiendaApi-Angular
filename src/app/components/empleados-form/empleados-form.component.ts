import {
  Component,
  effect,
  inject,
  input,
  OnChanges,
  output,
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
  empleadoGuardado = output<void>();
  empleadoPendiente: Empleados | null = null;
  cargoNombre = input([
    { name: 'Vendedor', value: 'Vendedor' },
    { name: 'Cajero', value: 'Cajero' },
    { name: 'Gerente', value: 'Gerente' },
  ]);

  private fb = inject(FormBuilder);
  private empleadoService = inject(EmpleadoService);

  form: FormGroup = this.fb.group({
    id: [0],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    edad: ['', Validators.required],
    email: ['', Validators.required],
    celular: [0, [Validators.required, Validators.min(0)]],
    cargo: ['', Validators.required],
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
    const pendiente = this.empleadoPendiente;
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
          alert('Empleado actualizado correctamente ✅');
          this.resetForm();
          this.empleadoGuardado.emit();
        },
        error: (err) => console.error('Error al actualizar producto:', err),
      });
    } else {
      this.empleadoService.saveEmpleado(empleado).subscribe({
        next: () => {
          alert('Empleado creado correctamente ✅');
          this.resetForm();
          this.empleadoGuardado.emit();
        },
        error: (err) => console.error('Error al crear producto:', err),
      });
    }
  }
  resetForm() {
    this.form.reset({
      id: 0,
      nombre: '',
      apellido: '',
      edad: '',
      email: '',
      celular: '',
      cargo: '',
    });
  }
  hasError(controlName: string, errorName: string) {
    const control = this.form.get(controlName);
    return control?.touched && control.hasError(errorName);
  }
  alerta() {
    this.resetForm();
  }
}
