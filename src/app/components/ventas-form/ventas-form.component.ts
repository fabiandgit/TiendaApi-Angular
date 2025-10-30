import {
  Component,
  inject,
  input,
  output,
  OnChanges,
  SimpleChanges,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputsComponent } from '../shared/inputs/inputs.component';
import { ButtonsComponent } from '../shared/buttons/buttons.component';
import { SelectsComponent } from '../shared/selects/selects.component';
import { Ventas } from '../../Models/Ventas.model';
import { VentasService } from '../../services/ventas.service';
import { EmpleadoService } from '../../services/empleado.service';
import { ProductoService } from '../../services/producto.service';
import { Productos } from '../../Models/Productos.model';

@Component({
  selector: 'app-ventas-form',
  imports: [
    InputsComponent,
    ButtonsComponent,
    SelectsComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './ventas-form.component.html',
  styleUrl: './ventas-form.component.css',
})
export class VentasFormComponent implements OnChanges {
  ventaSeleccionada = input<Ventas | null>(null);
  ventaGuardada = output<void>(); // 👈 Emite cuando se guarda o actualiza una venta

  empleadosSimplificados = signal<{ value: number; name: string }[]>([]);
  productosSimplificados = signal<
    { value: number; name: string; stock: number; price: number }[]
  >([]);
  productoActualizado: Productos = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
  };

  private fb = inject(FormBuilder);
  private ventasService = inject(VentasService);
  private empleadosService = inject(EmpleadoService);
  private productosService = inject(ProductoService);

  form: FormGroup = this.fb.group({
    id: [0],
    productoNombre: ['', Validators.required],
    empleadoNombre: ['', Validators.required],
    cantidad: ['', [Validators.required, Validators.min(1)]],
    total: ['', Validators.required],
  });

  ngOnInit(): void {
    this.cargarEmpleados();
    this.cargarProductos();
    this.form.get('total')?.disable();

    this.form.get('productoNombre')?.valueChanges.subscribe(() => {
      this.calcularTotal();
    });
    this.form.get('cantidad')?.valueChanges.subscribe(() => {
      this.calcularTotal();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ventaSeleccionada']) {
      const venta = this.ventaSeleccionada();
      if (venta) {
        this.form.patchValue(venta);
      }
    }
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const venta = this.form.value as Ventas;

    // buscar empleado
    venta.empleadoId = parseInt(venta.empleadoNombre);
    const empleado = this.empleadosSimplificados().find(
      (e) => e.value === venta.empleadoId
    );
    venta.empleadoNombre = empleado?.name ?? '';

    // buscar producto
    venta.productoId = parseInt(venta.productoNombre);
    const producto = this.productosSimplificados().find(
      (p) => p.value === venta.productoId
    );

    if (!producto) {
      alert('Producto no válido');
      return;
    }

    if (venta.cantidad > producto.stock) {
      alert(
        `Stock insuficiente. Solo hay ${producto.stock} unidades disponibles.`
      );
      return;
    }

    venta.productoNombre = producto.name;
    venta.total = producto.price * venta.cantidad;

    if (venta.id && venta.id > 0) {
      this.ventasService.updateVenta(venta.id, venta).subscribe({
        next: () => {
          alert('Venta actualizada correctamente ✅');
          this.resetForm();
          this.ventaGuardada.emit();
        },
        error: (err) => console.error('Error al actualizar la venta:', err),
      });
    } else {
      this.ventasService.addVenta(venta).subscribe({
        next: () => {
          alert('Venta creada correctamente ✅');
          this.actualizarStockProducto(producto, venta.cantidad);
          this.resetForm();
          this.ventaGuardada.emit(); // 🔥 recargar tabla
        },
        error: (err) => console.error('Error al crear la venta:', err),
      });
    }
  }

  private actualizarStockProducto(producto: any, cantidadVendida: number) {
    const nuevoStock = producto.stock - cantidadVendida;
    this.productoActualizado = {
      id: producto.value,
      nombre: producto.name,
      descripcion: producto.descripcion,
      precio: producto.price,
      stock: nuevoStock,
    };

    this.productosService
      .updateProducto(this.productoActualizado.id, this.productoActualizado)
      .subscribe({
        next: () => console.log('Stock actualizado correctamente'),
        error: (err) => console.error('Error al actualizar el stock', err),
      });
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
    });
  }

  calcularTotal() {
    const productoId = parseInt(this.form.get('productoNombre')?.value);
    const cantidad = parseFloat(this.form.get('cantidad')?.value);
    const producto = this.productosSimplificados().find(
      (p) => p.value === productoId
    );

    if (producto && !isNaN(cantidad)) {
      const total = cantidad <= producto.stock ? producto.price * cantidad : 0;
      this.form.get('total')?.setValue(total, { emitEvent: false });
    } else {
      this.form.get('total')?.setValue(0, { emitEvent: false });
    }
  }

  resetForm() {
    this.form.reset({
      id: 0,
      productoNombre: '',
      empleadoNombre: '',
      cantidad: 0,
      total: 0,
    });
  }

  alerta() {
    this.resetForm();
  }
}
