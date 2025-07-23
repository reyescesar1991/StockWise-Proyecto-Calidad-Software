import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { IRecoveryUserForm } from '../../../../../core/interfaces';
import { zodValidator } from '../../../../../core/zodValidator/zod.validator';
import { recoveryUserFormSchema } from '../../../../../core/form_Schemas';
import { LabelTypeComponent } from '../../../../../shared/label-type/label-type.component';
import { SnackNotificationService } from '../../../../../core/services/snackBar.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { IVerify2FA } from '../../../../../core/interfaces/auth/login.interface';
import { ICustomIdUser } from '../../../../../core/interfaces/dataUser/customIdUser.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { TwoFactorModalComponent } from '../../../../../shared/two-factor-modal/two-factor-modal.component';
import { ApiResponse } from '../../../../../core/interfaces/api/api-response.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recovery-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    LabelTypeComponent,
  ],
  templateUrl: './recovery-user.component.html',
  styleUrl: './recovery-user.component.scss',
})
export class RecoveryUserComponent {
  protected recoveryUserForm: FormGroup<IRecoveryUserForm>;
  private controlSecurityCode: boolean = false;
  protected securityCodeVisibility: string = 'visible';

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.recoveryUserForm = this.fb.group<IRecoveryUserForm>({
      idUser: this.fb.control('', {
        validators: [zodValidator(recoveryUserFormSchema.shape.idUser)],
        nonNullable: false,
      }),
    });
  }

  private authService = inject(AuthService);
  private snackBar = inject(SnackNotificationService);
  private router = inject(Router);


  protected getValueIdUser(): ICustomIdUser {
    const idValue = this.recoveryUserForm.get('idUser')?.value;

    const params: ICustomIdUser = {
      userId: idValue as string,
    };

    return params;
  }

  protected validateUser() {

    this.authService.request2FARecoveryPassword(this.getValueIdUser()).subscribe({
      next: () => this.handleValidateUserSuccess(),
      error: (response) => this.handleValidateUserError(response),
    });
  }

  protected handleValidateUserSuccess(): void {
    const userId = this.recoveryUserForm.get('idUser')?.value;
    if (!userId) {
      this.snackBar.error(
        'Error interno: No se pudo obtener el ID de usuario.',
        5000
      );
      return;
    }

    const dialogRef = this.dialog.open(TwoFactorModalComponent, {
      height: 'auto',
      width: 'auto',
      data: {
        userId: userId,
        typeOperation: '03',
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((wasSuccessful) => {
      if (wasSuccessful) {
        this.authService.recoveryUsername(this.getValueIdUser()).subscribe({
          next: (response) => this.handleRecoveryUsernameSuccess(response),
          error: (response) => this.handleRecoveryUsernameError(response),
        });
        // this.snackBar.success(
        //   'Código correcto. Su usuario fue enviado a su correo registrado.',
        //   5000
        // );
        // this.recoveryUserForm.get('idUser')?.disable();
      }
    });
  }

  protected handleRecoveryUsernameSuccess(response : ApiResponse<void>) : void {
    
    this.snackBar.success(response.message, 10000);
    this.router.navigate(['/login']);
  }

  protected handleRecoveryUsernameError(response : HttpErrorResponse) : void {

    this.snackBar.error(response.error.message, 10000);
    this.router.navigate(['/login']);
  }

  protected handleValidateUserError(response: HttpErrorResponse): void {
    this.snackBar.error(response.error.message);
  }

  protected getControlSecurityCode(): boolean {
    return this.controlSecurityCode;
  }

  protected setControlSecurityCode(status: boolean): void {
    this.controlSecurityCode = status;
  }

  protected validateSecurityCode() {
    const securityCodeValue = this.recoveryUserForm.get('securityCode')?.value;

    if (securityCodeValue) {
      this.snackBar.error(
        'El código de seguridad no coincide con el enviado, intente de nuevo',
        5000
      );
    } else {
      this.snackBar.success('Código correcto', 3000);
    }
  }
}
