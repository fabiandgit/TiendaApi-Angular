import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Ventas } from '../Models/Ventas.model';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  private apiUrl = `${environment.apiUrl}/Venta`;
  private http = inject(HttpClient);

  getAll(): Observable<Ventas[]> {
    return this.http.get<Ventas[]>(this.apiUrl);
  }

  getVentaId(id: number): Observable<Ventas> {
    return this.http.get<Ventas>(`${this.apiUrl}/${id}`);
  }

  addVenta(venta: Ventas): Observable<Ventas> {
    return this.http.post<Ventas>(this.apiUrl, venta);
  }

  updateVenta(id: number, venta: Ventas): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, venta);
  }

  deleteVenta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
