import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { loginFormSchema } from '../../../../../core/form_Schemas';
import { zodValidator } from '../../../../../core/zodValidator/zod.validator';
import { CommonModule,  } from '@angular/common';
import { ILoginForm } from '../../../../../core/interfaces';
import { LabelTypeComponent } from '../../../../../shared/label-type/label-type.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../../core/services/auth.service';
import { SnackNotificationService } from '../../../../../core/services/snackBar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ICredentials, ILoginResponse } from '../../../../../core/interfaces/auth/login.interface';
import { ApiResponse } from '../../../../../core/interfaces/api/api-response.interface';
import { MatDialog } from '@angular/material/dialog';
import { TwoFactorModalComponent } from '../../../../../shared/two-factor-modal/two-factor-modal.component';

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

    this.dialog.open(TwoFactorModalComponent, {
      height: 'auto',
      width: 'auto',
    });
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
      error: (error) => this.handleLoginError(error)
    });
  }

  /**
   * Maneja la respuesta exitosa del login.
   */
  private handleLoginSuccess(response: ApiResponse<ILoginResponse>): void {
    console.log(response);
    
    this.snackBar.success('¡Inicio de sesión exitoso!');
    this.router.navigate(['/dashboard']);
  }

  /**
   * Maneja los errores durante el login.
   */
  private handleLoginError(error: HttpErrorResponse): void {
    console.log(error.message);
    this.errorMessage = error.error?.message || 'Usuario o contraseña incorrectos.';
    this.snackBar.error(error.message);
  }
}
