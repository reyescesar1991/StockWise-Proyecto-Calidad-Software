import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IRecoveryPasswordForm } from '../../../../../core/interfaces';
import { zodValidator } from '../../../../../core/zodValidator/zod.validator';
import { NgIf } from '@angular/common';
import { LabelTypeComponent } from '../../../../../shared/label-type/label-type.component';
import { SnackNotificationService } from '../../../../../core/services/snackBar.service';
import { recoveryPasswordFormSchemaBase } from '../../../../../core/form_Schemas/recoveryPassword.form.schema.zod';
import { Subscription } from 'rxjs';
import { ICustomIdUser } from '../../../../../core/interfaces/dataUser/customIdUser.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../../../../core/interfaces/api/api-response.interface';
import { TwoFactorModalComponent } from '../../../../../shared/two-factor-modal/two-factor-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../../core/services/auth.service';
import { IRequestConfirmRecoveryPassword } from '../../../../../core/interfaces/auth/login.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recovery-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, LabelTypeComponent,],
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.scss',
})
export class RecoveryPasswordComponent {

  protected validatedUserButton: boolean = false;
  protected codeValidated: boolean = false;
  protected showActionValidateUser: boolean = true;
  private subscriptions = new Subscription();
  protected recoveryPasswordForm: FormGroup<IRecoveryPasswordForm>;

  constructor(private readonly fb: FormBuilder, public dialog: MatDialog, public readonly router : Router) {
    this.recoveryPasswordForm = this.fb.group<IRecoveryPasswordForm>({

      idUser: this.fb.control('', {
        validators: [zodValidator(recoveryPasswordFormSchemaBase.shape.idUser)],
        nonNullable: false,
      }),
      password: this.fb.control('', {
        validators: [zodValidator(recoveryPasswordFormSchemaBase.shape.password)],
        nonNullable: false,
      }),
      confirmPassword: this.fb.control('', {

        validators: [this.confirmPasswordValidator()
        ],
        nonNullable: false,
      })
    },)

  }
  private authService = inject(AuthService);
  private snackBar = inject(SnackNotificationService);

  ngOnInit() {
    this.subscriptions.add(
      this.recoveryPasswordForm.get('password')?.valueChanges.subscribe(() => {
        this.recoveryPasswordForm.get('confirmPassword')?.updateValueAndValidity();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


  protected validateUser() {
    const idUserControl = this.recoveryPasswordForm.get('idUser');
    if (idUserControl?.invalid) {
      this.snackBar.warning('Por favor, introduce un ID de usuario con el formato correcto.');
      return;
    }

    const user = idUserControl?.value;
    if (!user) {
      this.snackBar.error('El ID de usuario no puede estar vacío.', 5000);
      return;
    }

    const idUser: ICustomIdUser = {
      userId: user,
    };

    this.validatedUserButton = true;
    this.authService.request2FARecoveryPassword(idUser).subscribe({
      next: () => this.handleValidateUserSuccess(),
      error: (response) => this.handleValidateUserError(response),
      complete: () => (this.validatedUserButton = false),
    });
  }

  private handleValidateUserSuccess(): void {
    const userId = this.recoveryPasswordForm.get('idUser')?.value;
    if (!userId) {
      this.snackBar.error('Error interno: No se pudo obtener el ID de usuario.', 5000);
      return;
    }

    const dialogRef = this.dialog.open(TwoFactorModalComponent, {
      height: 'auto',
      width: 'auto',
      data: {
        userId: userId,
        typeOperation: '02',
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((wasSuccessful) => {
      if (wasSuccessful) {
        this.snackBar.success('Código correcto. Ingrese su nueva contraseña.', 5000);
        this.codeValidated = true;
        this.showActionValidateUser = false;
        this.recoveryPasswordForm.get('idUser')?.disable();
      }
    });
  }

  private handleValidateUserError(response: HttpErrorResponse): void {
    console.log(response);
    this.snackBar.error(response.error.message, 10000);
  }

  protected getValueForm() {
    console.log(this.recoveryPasswordForm.getRawValue());

    const params : IRequestConfirmRecoveryPassword = {

      idUser : this.recoveryPasswordForm.get('idUser')?.value as string,
      newPassword : this.recoveryPasswordForm.get('password')?.value as string,
    }

    this.authService.recoveryPassword(params).subscribe({
      next: (response) => this.handleRecoveryPasswordSuccess(response),
      error: (response) => this.handleRecoveryPasswordError(response),
    });
  }

  protected handleRecoveryPasswordSuccess(response : ApiResponse<void>) : void {

    this.snackBar.success(response.message);
    this.router.navigate(['/login']);
  }

  protected handleRecoveryPasswordError(response : HttpErrorResponse) : void {
    this.snackBar.error(response.error.message);
    this.router.navigate(['/login']);
  }

  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) return null;
      const password = control.parent.get('password')?.value;
      const confirmPassword = control.value;

      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }
}
