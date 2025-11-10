import {
  Component,
  Input,
  input,
  OnChanges,
  SimpleChanges,
  inject,
  effect,
  output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Productos } from '../../Models/Productos.model';
import { InputsComponent } from '../../components/shared/inputs/inputs.component';
import { ButtonsComponent } from '../../components/shared/buttons/buttons.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productos-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputsComponent,
    ButtonsComponent,
    CommonModule,
  ],
  templateUrl: './productos-form.component.html',
})
export class ProductosFormComponent implements OnChanges {
  // @Input() productoSeleccionado: Productos | null = null;
  // ✅ Recibimos el producto a editar desde el padre (puede ser null)
  productoSeleccionado = input<Productos | null>(null);
  productoGuardado = output<void>();

  private toast = inject(ToastrService);
  private fb = inject(FormBuilder);
  private productoService = inject(ProductoService);
  private productoPendiente: Productos | null = null;

  // Formulario reactivo
  form: FormGroup = this.fb.group({
    id: [0],
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    precio: [0, [Validators.required, Validators.min(1)]],
    stock: [0, [Validators.required, Validators.min(1)]],
  });

  /**
   * 🧩 Detecta cuando se pasa un producto para editarlo
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productoSeleccionado']) {
      const producto = this.productoSeleccionado();
      if (producto) {
        this.form.patchValue(producto);
      }
      // else {
      //   this.resetForm();
      // }
    }
  }
  ngOnInit(): void {
    const producto = this.productoPendiente;
    if (producto) {
      this.form.patchValue(producto);
    }
  }
  // constructor() {
  //   effect(() => {
  //     const producto = this.productoSeleccionado();
  //     if (producto) {
  //       this.form.patchValue(producto);
  //     }else {
  //   this.resetForm();
  // }
  //   });
  // }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const producto = this.form.value as Productos;

    if (producto.id && producto.id > 0) {
      this.productoService.updateProducto(producto.id, producto).subscribe({
        next: () => {
          this.resetForm();
          this.productoGuardado.emit();
          this.toast.success('Exito', 'Producto Actualizado correctamente ✅');
        },
        error: (err) => {
          console.error('Error al actualizar producto:', err);
          this.toast.error('Error', err);
        },
      });
    } else {
      this.productoService.addProducto(producto).subscribe({
        next: () => {
          this.toast.success('Exito', 'Producto creado correctamente ✅');
          this.resetForm();
          this.productoGuardado.emit();
        },
        error: (err) => {
          console.error('Error al crear producto:', err);
          this.toast.success('Error', err);
        },
      });
    }
  }

  /**
   * 🔄 Limpia el formulario después de guardar
   */
  resetForm() {
    this.form.reset({
      id: 0,
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0,
    });
    this.productoGuardado.emit();
  }
  alerta() {
    this.resetForm();
  }
}
