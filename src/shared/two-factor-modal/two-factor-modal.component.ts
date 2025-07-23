import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, Inject, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../core/services/auth.service';
import { SnackNotificationService } from '../../core/services/snackBar.service';
import { ILoginResponse, IVerify2FA } from '../../core/interfaces/auth/login.interface';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../core/interfaces/api/api-response.interface';
import { SimpleResponseFunction } from '../../core/functions/simpleResponse.function';

@Component({
  selector: 'app-two-factor-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './two-factor-modal.component.html',
  styleUrl: './two-factor-modal.component.scss'
})
export class TwoFactorModalComponent implements AfterViewInit {

  // Inyectamos los servicios necesarios
  private authService = inject(AuthService);
  private snackBar = inject(SnackNotificationService);
  private router = inject(Router);
  private renderer = inject(Renderer2);
  private simpleResponse = inject(SimpleResponseFunction);
  private typeOperation: string = '01';

  // Obtenemos una lista de referencias a los inputs del código
  @ViewChildren('codeInput') codeInputs!: QueryList<ElementRef<HTMLInputElement>>;

  // Propiedad para mostrar mensajes de error en la plantilla
  protected errorMessage: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<TwoFactorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dataUser: { userId: string, preAuthToken: string, typeOperation?: string }
  ) { }

  ngOnInit(): void {
    this.typeOperation = this.dataUser.typeOperation as string;

    console.log(this.typeOperation);

  }

  ngAfterViewInit(): void {
    // Pequeña mejora de UX: auto-focus y movimiento entre inputs
    const inputs = this.codeInputs.toArray();
    if (inputs.length > 0) {
      // Enfocar el primer input al cargar el modal
      inputs[0].nativeElement.focus();

      inputs.forEach((input, index) => {
        // Mover el foco al siguiente input al escribir un número
        this.renderer.listen(input.nativeElement, 'input', () => {
          if (input.nativeElement.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].nativeElement.focus();
          }
        });

        // Mover el foco al input anterior al presionar Backspace en un input vacío
        this.renderer.listen(input.nativeElement, 'keyup', (event: KeyboardEvent) => {
          if (event.key === 'Backspace' && input.nativeElement.value.length === 0 && index > 0) {
            inputs[index - 1].nativeElement.focus();
          }
        });
      });
    }
  }

  /**
   * Recolecta el código de los inputs, lo valida y lo envía al servicio de autenticación.
   */
  protected verifyCode2FA(): void {
    this.errorMessage = null; // Limpiamos errores previos

    // 1. Extraer el código de los inputs
    const code = this.codeInputs.toArray().map(el => el.nativeElement.value).join('');

    // 2. Validar que el código tenga 6 dígitos y sean solo números
    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      this.errorMessage = 'Por favor, ingresa un código válido de 6 dígitos.';
      this.snackBar.warning(this.errorMessage);
      return;
    }

    // 3. Preparar los parámetros para la llamada al servicio
    const params: IVerify2FA = {
      userId: this.dataUser.userId,
      code: code
    };

    if (this.typeOperation === '01') {


      // 4. Llamar al servicio y manejar la respuesta
      this.authService.verify2FA(params).subscribe({
        next: (response) => this.handleVerifySuccess(response),
        error: (response) => this.handleVerifyError(response)
      });
      console.log(params);
    }
    else if (this.typeOperation === '02') {


      this.authService.verify2FARecoveryPassword(params).subscribe({
        next: (response) => this.handleRequestRecoveryPasswordSuccess(response),
        error: (response) => this.handleRequestRecoveryPasswordError(response)
      });
    }
    else {

      this.authService.verify2FARecoveryUsername(params).subscribe({
        next: (response) => this.handleRequestRecoveryUsernameSuccess(response),
        error: (response) => this.handleRequestRecoveryUsernameError(response)
      });
    }

  }

  protected handleRequestRecoveryUsernameSuccess(response: ApiResponse<void>) : void {

    this.simpleResponse.sendSimpleResponseOk(response);
    this.dialogRef.close(true);
  }

  protected handleRequestRecoveryUsernameError(response: HttpErrorResponse) : void {

    this.simpleResponse.sendSimpleResponseError(response);
    this.dialogRef.close(false);
  }

  protected handleRequestRecoveryPasswordSuccess(response: ApiResponse<void>) {

    this.simpleResponse.sendSimpleResponseOk(response);
    this.dialogRef.close(true);
  }

  protected handleRequestRecoveryPasswordError(response: HttpErrorResponse) {

    this.simpleResponse.sendSimpleResponseError(response);
    this.dialogRef.close(false);
  }

  /**
   * Maneja la respuesta exitosa de la verificación 2FA.
   */
  private handleVerifySuccess(response: ApiResponse<ILoginResponse>): void {
    this.authService.setToken(response.data.token);
    this.snackBar.success(response.message || '¡Verificación exitosa!');
    this.dialogRef.close(true); // Cierra el modal indicando éxito
    this.router.navigate(['/dashboard']);
  }

  /**
   * Maneja los errores durante la verificación 2FA.
   */
  private handleVerifyError(response: HttpErrorResponse): void {
    this.snackBar.error(response.message);

    // Limpiamos los inputs y enfocamos el primero para un nuevo intento
    const inputs = this.codeInputs.toArray();
    inputs.forEach(input => input.nativeElement.value = '');
    if (inputs.length > 0) {
      inputs[0].nativeElement.focus();
    }
  }

  protected closeModal() {

    this.dialogRef.close(false); // Cierra el modal sin éxito

  }
}
