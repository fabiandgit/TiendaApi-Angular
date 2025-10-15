import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    children: [
      {
        path: 'productos',
        loadComponent: () =>
          import('./pages/productos/productos.component').then(
            (m) => m.ProductosComponent
          ),
      },
      {
        path: 'empleados',
        loadComponent: () =>
          import('./pages/empleados/empleados.component').then(
            (e) => e.EmpleadosComponent
          ),
      },
    ],
  },
];
