import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { loginFormSchema } from '../../../../../core/form_Schemas';
import { zodValidator } from '../../../../../core/zodValidator/zod.validator';
import { CommonModule,  } from '@angular/common';
import { ILoginForm } from '../../../../../core/interfaces';
import { LabelTypeComponent } from '../../../../../shared/label-type/label-type.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ICredentials, ILogin2faResponse, ILoginResponse } from '../../../../../core/interfaces/auth/login.interface';
import { ApiResponse } from '../../../../../core/interfaces/api/api-response.interface';
import { MatDialog } from '@angular/material/dialog';
import { TwoFactorModalComponent } from '../../../../../shared/two-factor-modal/two-factor-modal.component';
import { SnackNotificationService } from '../../../../../core/services/snackBar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LabelTypeComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  protected formLogin: FormGroup<ILoginForm>;
  protected errorMessage: string | null = null;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(SnackNotificationService);

  constructor(
        public dialog: MatDialog,
  ) {
    this.formLogin = this.fb.group<ILoginForm>({
      username: this.fb.control('', {
        validators: [zodValidator(loginFormSchema.shape.username)],
        nonNullable: true
      }),
      password: this.fb.control('', {
        validators: [zodValidator(loginFormSchema.shape.password)],
        nonNullable: true
      })
    });
  }

  ngOnInit(){
    // El modal de 2FA no debe abrirse al iniciar el componente, sino como respuesta al login.
  }

  protected login(): void {
    if (this.formLogin.invalid) {
      this.snackBar.warning('Por favor, completa todos los campos correctamente.');
      return;
    }

    this.errorMessage = null; // Limpiamos errores previos
    const credentials = this.formLogin.getRawValue() as ICredentials;

    this.authService.login(credentials).subscribe({
      next: (response) => this.handleLoginSuccess(response),
      error: (response) => this.handleLoginError(response)
    });
  }

  /**
   * Maneja la respuesta exitosa del login.
   */
  private handleLoginSuccess(response: ApiResponse<ILoginResponse | ILogin2faResponse>): void {
    const data = response.data;

    // Usamos una "type guard" para diferenciar la respuesta.
    // Si la respuesta contiene `preAuthToken`, es para 2FA.
    if ('preAuthToken' in data) {
      this.snackBar.info(response.message || 'Se requiere verificación de dos factores.');
      this.dialog.open(TwoFactorModalComponent, {
        height: 'auto',
        width: 'auto',
        data: {
          userId: data.userId,
          preAuthToken: data.preAuthToken
        },
        disableClose: true // Evita que el modal se cierre accidentalmente
      });
    } else {
      // Si no, es una respuesta de login normal con el token.
      this.authService.setToken(data.token);
      this.snackBar.success(response.message);
      this.router.navigate(['/dashboard']);
    }
  }

  /**
   * Maneja los errores durante el login.
   */
  private handleLoginError(response: HttpErrorResponse): void {
    console.log(response);
    this.snackBar.error(response.error.message, 10000);
  }
}
