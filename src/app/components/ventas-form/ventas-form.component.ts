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
import { EmpleadoService } from '../../services/empleado.service';
import { ProductoService } from '../../services/producto.service';

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
  empleadosSimplificados = signal<{ value: number; name: string }[]>([]);
  productosSimplificados = signal<{ value: number; name: string }[]>([]);

  private fb = inject(FormBuilder);
  private ventasService = inject(VentasService);
  private empleadosService = inject(EmpleadoService);
  private productosService = inject(ProductoService);
  private ventaPendiente: Ventas | null = null;

  form: FormGroup = this.fb.group({
    id: [0],
    productoNombre: ['', Validators.required],
    empleadoNombre: ['', Validators.required],
    cantidad: ['', [Validators.required, Validators.min(0)]],
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
    this.cargarEmpleados();
    this.cargarProductos();
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

    let venta = this.form.value as Ventas;
    venta.empleadoId = parseInt(venta.empleadoNombre);
    const empleado = this.empleadosSimplificados().find(
      (e) => e.value === venta.empleadoId
    );
    venta.empleadoNombre = empleado?.name ?? '';

    venta.productoId = parseInt(venta.productoNombre);
    const producto = this.productosSimplificados().find(
      (p) => p.value === venta.productoId
    );
    venta.productoNombre = producto?.name ?? '';

    if (venta.id && venta.id > 0) {
      this.ventasService.updateVenta(venta.id, venta).subscribe({
        next: () => {
          alert('Producto actualizado correctamente ✅');
          this.resetForm();
          location.reload();
        },
        error: (err) =>
          console.log('No se pudo actualizar la información', err),
      });
    } else {
      this.ventasService.addVenta(venta).subscribe({
        next: () => {
          alert('Venta guardada correctamente ✅');
          this.resetForm();
          location.reload();
        },
        error: (err) => console.log('No se pudo guardar la información', err),
      });
    }
  }

  cargarEmpleados() {
    this.empleadosService.getAll().subscribe({
      next: (data) => {
        const simplificados = data.map((empleado) => ({
          value: empleado.id,
          name: `${empleado.nombre} ${empleado.apellido}`,
        }));
        this.empleadosSimplificados.set(simplificados);
      },
      error: (err) => console.log('Error al consultar los empleados', err),
    });
  }

  cargarProductos() {
    this.productosService.getProductos().subscribe({
      next: (data) => {
        const simplificados = data.map((producto) => ({
          value: producto.id,
          name: producto.nombre,
          stock: producto.stock,
          price: producto.precio,
        }));
        this.productosSimplificados.set(simplificados);
      },
      error: (err) => console.log('error al consultar los productos', err),
    });
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
