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
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputsComponent, ButtonsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  formLogin: FormGroup = this.fb.group({
    userName: ['', Validators.required],
    userPassword: ['', Validators.required],
  });
  private router = inject(Router);

  onSubmit() {
    if (this.formLogin.invalid) return this.formLogin.markAllAsTouched();

    const username = this.formLogin.value.userName;
    const userpassword = this.formLogin.value.userPassword;

    this.authService.login(username, userpassword).subscribe({
      next: () => console.log('Login exitoso ✅'),
      error: (err) => alert('Credenciales incorrectas ❌'),
    });
  }
}
