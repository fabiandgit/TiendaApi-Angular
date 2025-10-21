import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/empleados`;

  getAll() {}
  getEmpleadoId() {}
  saveEmpleado() {}
  deleteEmpleado() {}
}
