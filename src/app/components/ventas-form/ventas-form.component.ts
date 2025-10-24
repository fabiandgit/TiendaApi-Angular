import {
  Component,
  inject,
  input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { InputsComponent } from '../shared/inputs/inputs.component';
import { ButtonsComponent } from '../shared/buttons/buttons.component';
import { Ventas } from '../../Models/Ventas.model';
import { VentasService } from '../../services/ventas.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SelectsComponent } from '../shared/selects/selects.component';

@Component({
  selector: 'app-ventas-form',
  imports: [
    InputsComponent,
    ButtonsComponent,
    ReactiveFormsModule,
    SelectsComponent,
  ],
  templateUrl: './ventas-form.component.html',
  styleUrl: './ventas-form.component.css',
})
export class VentasFormComponent implements OnChanges {
  ventaSeleccionada = input<Ventas | null>(null);

  private fb = inject(FormBuilder);
  private ventasService = inject(VentasService);
  private ventaPendiente: Ventas | null = null;

  empleados = signal([
    { name: 'fabian', value: 'fabian' },
    { name: 'david', value: 'david' },
    { name: 'juan', value: 'juan' },
  ]);

  form: FormGroup = this.fb.group({
    id: [0],
    nombreProducto: ['', Validators.required],
    empleadoNombre: ['', Validators.required],
    amount: ['', [Validators.required, Validators.min(0)]],
    total: ['', [Validators.required, Validators.min(0)]],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ventaSeleccionada']) {
      const venta = this.ventaSeleccionada();
      if (venta) {
        this.form.patchValue(venta);
      }
    }
  }

  ngOnInit(): void {
    const pendiente = this.ventaPendiente;
    if (pendiente) {
      this.form.patchValue(pendiente);
    }
  }
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
  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const venta = this.form.value as Ventas;
    if (venta.id && venta.id > 0) {
      this.ventasService.updateVenta(venta.id, venta).subscribe({
        next: () => {
          alert('Producto actualizado correctamente ✅');
          this.resetForm();
        },
        error: (err) =>
          console.log('No se pudo actualizar la informacion', err),
      });
    } else {
      this.ventasService.addVenta(venta).subscribe({
        next: (data) => console.log('Se actualizo la venta correctamente'),
        error: (err) =>
          console.log('No se pudo actualizar la informacion', err),
      });
    }
  }

  resetForm() {
    this.form.reset({
      id: 0,
      nombreProducto: '',
      empleadoNombre: '',
      amount: 0,
      total: 0,
    });
  }
}
