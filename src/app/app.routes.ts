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
      // {
      //   path: 'productos/agregar',
      //   loadComponent: () =>
      //     import('./pages/productos/agregar-producto.component').then(
      //       (m) => m.AgregarProductoComponent
      //     ),
      // },
      // {
      //   path: 'productos/editar/:id',
      //   loadComponent: () =>
      //     import('./pages/productos/editar-producto.component').then(
      //       (m) => m.EditarProductoComponent
      //     ),
      // },
    ],
  },
];
