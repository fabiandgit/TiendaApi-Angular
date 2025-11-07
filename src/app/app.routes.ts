import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./auth/login/login.component').then((l) => l.LoginComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'productos',
    loadComponent: () =>
      import('./pages/productos/productos.component').then(
        (m) => m.ProductosComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'empleados',
    loadComponent: () =>
      import('./pages/empleados/empleados.component').then(
        (e) => e.EmpleadosComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'ventas',
    loadComponent: () =>
      import('./pages/ventas/ventas.component').then((v) => v.VentasComponent),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full', // Asegura que la ruta comodín coincida con la URL completa
  },
];
