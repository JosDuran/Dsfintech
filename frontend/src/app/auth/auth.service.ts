// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  // Login, devuelve access y refresh
  login(username: string, password: string) {
    return this.http.post<any>(`${this.api}/token/`, { username, password });
  }

  // Guardamos el token tras login
  storeToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  // Obtener token para interceptor
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Logout simple
  logout() {
    localStorage.removeItem('access_token');
  }

  // Saber si el usuario está logueado
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

