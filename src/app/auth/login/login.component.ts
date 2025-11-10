import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { InputsComponent } from '../../components/shared/inputs/inputs.component';
import { ButtonsComponent } from '../../components/shared/buttons/buttons.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputsComponent, ButtonsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toast = inject(ToastrService);

  formLogin: FormGroup = this.fb.group({
    userName: ['', Validators.required],
    userPassword: ['', Validators.required],
  });

  onSubmit() {
    if (!this.formLogin.invalid) {
      console.log('entro');

      const username = this.formLogin.value.userName;
      const userpassword = this.formLogin.value.userPassword;

      this.authService.login(username, userpassword).subscribe({
        next: () => this.toast.success('Existo', 'Inicio sesion exitoso'),
        error: (err) =>
          this.toast.error('Error!', 'Credenciales incorrectas ❌'),
      });
    } else {
      this.toast.warning('Ojo', 'IEscribe un usuario o contraseña valido');
      return this.formLogin.markAllAsTouched();
    }
  }
}
