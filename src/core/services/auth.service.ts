import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, tap, delay, throwError } from 'rxjs';
import { ICredentials, ILogin2faResponse, ILoginResponse, IRequestConfirmRecoveryPassword, IVerify2FA } from '../interfaces/auth/login.interface';
import { ApiResponse } from '../interfaces/api/api-response.interface';
import { ICustomIdUser, IValidateCustomIdUserResponse } from '../interfaces/dataUser/customIdUser.interface';

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
  private request2FALoginUrl = `${this.apiUrl}/v1/auth/verify-2fa`;
  private request2FARecoveryPasswordUrl = `${this.apiUrl}/v1/auth/recover-password/initiate`;
  private verify2FARecoveryPasswordUrl = `${this.apiUrl}/v1/auth/recover-password/verify`;
  private recoveryPasswordUrl = `${this.apiUrl}/v1/auth/recover-password/confirm`;
  private request2FARecoveryUsernameUrl = `${this.apiUrl}/v1/auth/recover-username/initiate`;
  private verify2FARecoveryUsernameUrl = `${this.apiUrl}/v1/auth/recover-username/verify`;
  private recoveryUsernameUrl = `${this.apiUrl}/v1/auth/recover-username/confirm`;

  login(credentials: ICredentials): Observable<ApiResponse<ILoginResponse | ILogin2faResponse>> {
    if (environment.useDummyData) {
      // Simula una respuesta 2FA para un usuario específico
      if (credentials.username === 'testUser2') {
        const dummy2faResponse: ApiResponse<ILogin2faResponse> = {
          message: 'Se requiere verificación de dos factores.',
          code: 200,
          data: {
            userId: 'dummy-user-id-123',
            preAuthToken: 'dummy-pre-auth-token-xyz'
          }
        };
        return of(dummy2faResponse).pipe(delay(500)); // Simula la latencia de red
      }

      // Simula un inicio de sesión exitoso para cualquier otro usuario
      const dummySuccessResponse: ApiResponse<ILoginResponse> = {
        message: 'Inicio de sesión exitoso (Modo Dummy).',
        code: 200,
        data: {
          token: 'dummy-jwt-token-abc-123-xyz-789'
        }
      };
      return of(dummySuccessResponse).pipe(delay(500));
    }

    // Llamada real a la API. El token se guardará en el componente
    // ya que la respuesta puede ser de dos tipos.
    return this.http.post<ApiResponse<ILoginResponse | ILogin2faResponse>>(this.loginUrl, credentials);
  }

  verify2FA(params: IVerify2FA): Observable<ApiResponse<ILoginResponse>> {
    if (environment.useDummyData) {
      // Simula una verificación 2FA exitosa
      if (params.code === '123456') {
        const dummySuccessResponse: ApiResponse<ILoginResponse> = {
          message: 'Verificación exitosa. ¡Bienvenido!',
          code: 200,
          data: {
            token: 'final-dummy-jwt-token-after-2fa-verification'
          }
        };
        return of(dummySuccessResponse).pipe(delay(500));
      } else {
        // Simula un código incorrecto
        const errorResponse = new HttpErrorResponse({
          error: { message: 'Código de verificación incorrecto.' },
          status: 401
        });
        return throwError(() => errorResponse);
      }
    }

    return this.http.post<ApiResponse<ILoginResponse>>(this.request2FALoginUrl, params);
  }

  request2FARecoveryPassword(params: ICustomIdUser): Observable<ApiResponse<void>> {
    if (environment.useDummyData) {
      // Simula una verificación 2FA exitosa
      if (params.userId === 'USER9999') {
        const dummySuccessResponse: ApiResponse<void> = {
          message: 'Usuario existe',
          code: 200,
          data: undefined
        };
        console.log("URL : ", this.request2FARecoveryPasswordUrl);
        return of(dummySuccessResponse).pipe(delay(500));
      } else {
        // Simula un código incorrecto
        const errorResponse = new HttpErrorResponse({
          error: { message: 'Usuario no existe' },
          status: 401
        });
        return throwError(() => errorResponse);
      }
    }

    return this.http.post<ApiResponse<void>>(this.request2FARecoveryPasswordUrl, params);
  }

  verify2FARecoveryPassword(params: IVerify2FA): Observable<ApiResponse<void>> {
    if (environment.useDummyData) {
      // Simula una verificación 2FA exitosa
      if (params.code === '123456') {
        const dummySuccessResponse: ApiResponse<void> = {
          message: 'Verificación exitosa con factor 2FA',
          code: 200,
          data: undefined
        };
        return of(dummySuccessResponse).pipe(delay(500));
      } else {
        // Simula un código incorrecto
        const errorResponse = new HttpErrorResponse({
          error: { message: 'Código de verificación incorrecto.' },
          status: 401
        });
        return throwError(() => errorResponse);
      }
    }

    return this.http.post<ApiResponse<void>>(this.verify2FARecoveryPasswordUrl, params);
  }

  recoveryPassword(params: IRequestConfirmRecoveryPassword): Observable<ApiResponse<void>> {

    if (environment.useDummyData) {

      if (params.idUser === 'USER9999') {

        const dummySuccessResponse: ApiResponse<void> = {
          message: 'Cambio de contraseña exitoso',
          code: 200,
          data: undefined
        };
        return of(dummySuccessResponse).pipe(delay(500));
      }
      else {

        // Simula un código incorrecto
        const errorResponse = new HttpErrorResponse({
          error: { message: 'Error al cambiar la contraseña.' },
          status: 401
        });
        return throwError(() => errorResponse);
      }
    }
    return this.http.post<ApiResponse<void>>(this.recoveryPasswordUrl, params);
  }

  request2FARecoveryUsername(params: ICustomIdUser): Observable<ApiResponse<void>> {
    if (environment.useDummyData) {
      // Simula una verificación 2FA exitosa
      if (params.userId === 'USER9999') {
        const dummySuccessResponse: ApiResponse<void> = {
          message: 'Codigo 2FA enviado a su correo registrado',
          code: 200,
          data: undefined
        };
        console.log("URL : ", this.request2FARecoveryUsernameUrl);
        return of(dummySuccessResponse).pipe(delay(500));
      } else {
        // Simula un código incorrecto
        const errorResponse = new HttpErrorResponse({
          error: { message: 'Usuario no existe' },
          status: 401
        });
        return throwError(() => errorResponse);
      }
    }

    return this.http.post<ApiResponse<void>>(this.request2FARecoveryUsernameUrl, params);
  }

  verify2FARecoveryUsername(params: IVerify2FA): Observable<ApiResponse<void>> {
    if (environment.useDummyData) {
      // Simula una verificación 2FA exitosa
      if (params.code === '123456') {
        const dummySuccessResponse: ApiResponse<void> = {
          message: 'Verificación exitosa con factor 2FA',
          code: 200,
          data: undefined
        };
        return of(dummySuccessResponse).pipe(delay(500));
      } else {
        // Simula un código incorrecto
        const errorResponse = new HttpErrorResponse({
          error: { message: 'Código de verificación incorrecto.' },
          status: 401
        });
        return throwError(() => errorResponse);
      }
    }

    return this.http.post<ApiResponse<void>>(this.verify2FARecoveryUsernameUrl, params);
  }

  recoveryUsername(params: ICustomIdUser): Observable<ApiResponse<void>> {

    if (environment.useDummyData) {

      if (params.userId === 'USER9999') {

        const dummySuccessResponse: ApiResponse<void> = {
          message: 'Usuario enviado a su correo',
          code: 200,
          data: undefined
        };
        return of(dummySuccessResponse).pipe(delay(500));
      }
      else {

        // Simula un código incorrecto
        const errorResponse = new HttpErrorResponse({
          error: { message: 'Error al validar usuario' },
          status: 401
        });
        return throwError(() => errorResponse);
      }
    }
    return this.http.post<ApiResponse<void>>(this.recoveryUsernameUrl, params);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  //TODO: USER SESSION EN VEZ DE LOCAL
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    // Aquí podrías limpiar otros datos del usuario si es necesario
  }
}
