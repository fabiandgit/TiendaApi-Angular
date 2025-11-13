import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Productos } from '../Models/Productos.model';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Producto`; // 👈 Ajusta según tu endpoint backend

  /**
   * 🟢 Obtener todos los productos
   */
  getProductos(): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.apiUrl);
  }

  /**
   * 🟢 Obtener un producto por id
   */
  getProductoById(id: number): Observable<Productos> {
    return this.http.get<Productos>(`${this.apiUrl}/${id}`);
  }

  /**
   * 🟢 Crear un producto nuevo
   */
  addProducto(producto: Productos): Observable<Productos> {
    return this.http.post<Productos>(this.apiUrl, producto);
  }

  /**
   * 🟡 Actualizar producto existente
   */
  updateProducto(id: number, producto: Productos): Observable<void> {
    console.log(`${id}, producto ${producto}`);

    return this.http.put<void>(`${this.apiUrl}/${id}`, producto);
  }

  /**
   * 🔴 Eliminar producto por id
   */
  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getProductosPaginados(
    page: number,
    size: number
  ): Observable<{ items: Productos[]; totalCount: number }> {
    const params = { pageNumber: page, pageSize: size };
    return this.http.get<{ items: Productos[]; totalCount: number }>(
      `${this.apiUrl}/paged`,
      { params }
    );
  }
}
