import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const authToken = authService.getToken();

  // Lista de rutas de API que no necesitan token (ej. /api/login, /api/register)
  // Usamos partes de la URL que identifiquen estas rutas de forma única.
  const urlsExcluidas = [
    'login',
    'recuperar-clave',
    'recuperar-usuario',
    'registrar-usuario'
  ];

  // Verificamos si la URL de la petición debe ser excluida.
  const debeExcluir = urlsExcluidas.some(path => req.url.includes(path));

  let authReq = req;

  // Si hay un token y la URL no está en la lista de exclusión, clonamos la petición
  // para añadir la cabecera de autorización.
  if (authToken && !debeExcluir) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });
  }

  // Enviamos la petición (original o clonada) y manejamos los errores de forma centralizada.
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Solo redirigimos en error 401 si NO es una de las rutas excluidas.
      // Un 401 en el login es un error esperado (credenciales incorrectas) y no debe causar un logout.
      if (error.status === 401 && !debeExcluir) {
        // Si el token es inválido o ha expirado, cerramos sesión y redirigimos.
        authService.logout();
        router.navigate(['/login']);
      }
      // Re-lanzamos el error para que otros manejadores (como un snackbar) puedan capturarlo.
      return throwError(() => error);
    })
  );
};
