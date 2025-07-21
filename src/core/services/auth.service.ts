import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ICredentials, ILoginResponse } from '../interfaces/auth/login.interface';
import { ApiResponse } from '../interfaces/api/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'stockwise_auth_token';
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

    constructor() { }

  // Asumimos que tu endpoint es /api/v1/auth/login
  // La URL completa será: http://localhost:3001/api/v1/auth/login
  private loginUrl = `${this.apiUrl}/v1/auth/login`;

  login(credentials: ICredentials): Observable<ApiResponse<ILoginResponse>> {
    return this.http.post<ApiResponse<ILoginResponse>>(this.loginUrl, credentials).pipe(
      tap(response => {
        // Cuando el login es exitoso, guardamos el token
        this.setToken(response.data.token); // Ahora 'data' está correctamente tipado
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    // Aquí podrías limpiar otros datos del usuario si es necesario
  }
}
