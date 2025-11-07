import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/Auth`;
  private http = inject(HttpClient);
  private router = inject(Router);

  // Estado reactivo de login
  isLoggedIn = signal<boolean>(false);

  username = signal<string>('');

  setUsername(name: string) {
    this.username.set(name);
  }

  getuserName(): string | null {
    return localStorage.getItem('nombreUsuario');
  }

  login(username: string, password: string): Observable<any> {
    let logindto = {
      NombreUsuario: username,
      Password: password,
    };
    return this.http.post(`${this.apiUrl}/login`, logindto).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('nombreUsuario', username);
        this.isLoggedIn.set(true);
        this.router.navigate(['/home']);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nombreUsuario');
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  checkAuth(): boolean {
    const token = this.getToken();
    this.isLoggedIn.set(!!token);
    return !!token;
  }
}
