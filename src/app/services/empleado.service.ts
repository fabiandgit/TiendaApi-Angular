import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleados } from '../Models/Empleados.model';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private apiUrl = `${environment.apiUrl}/empleados`;
  private http = inject(HttpClient);

  getAll(): Observable<Empleados[]> {
    return this.http.get<Empleados[]>(this.apiUrl);
  }

  getEmpleadoId(id: number): Observable<Empleados> {
    return this.http.get<Empleados>(`${this.apiUrl}/${id}`);
  }

  saveEmpleado(empleado: Empleados): Observable<Empleados> {
    return this.http.post<Empleados>(this.apiUrl, empleado);
  }

  updateEmpleado(id: number, empleado: Empleados): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, empleado);
  }

  deleteEmpleado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
