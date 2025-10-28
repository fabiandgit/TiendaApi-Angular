import {
  Component,
  Input,
  input,
  OnChanges,
  SimpleChanges,
  inject,
  effect,
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
  // ✅ Recibimos el producto a editar desde el padre (puede ser null)
  // @Input() productoSeleccionado: Productos | null = null;
  productoSeleccionado = input<Productos | null>(null);

  // Inyecciones
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
  //     }
  //   });
  // }

  /**
   * 💾 Guarda o actualiza el producto según el caso
   */
  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const producto = this.form.value as Productos;

    if (producto.id && producto.id > 0) {
      // 🟡 Actualizar producto existente
      this.productoService.updateProducto(producto.id, producto).subscribe({
        next: () => {
          alert('Producto actualizado correctamente ✅');
          this.resetForm();
          location.reload();
        },
        error: (err) => console.error('Error al actualizar producto:', err),
      });
    } else {
      // 🟢 Crear producto nuevo
      this.productoService.addProducto(producto).subscribe({
        next: () => {
          alert('Producto creado correctamente ✅');
          this.resetForm();
          location.reload();
        },
        error: (err) => console.error('Error al crear producto:', err),
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
  }
}
