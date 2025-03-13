import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IRecoveryPasswordForm } from '../../../../../core/interfaces';
import { zodValidator } from '../../../../../core/zodValidator/zod.validator';
import { NgIf } from '@angular/common';
import { LabelTypeComponent } from '../../../../../shared/label-type/label-type.component';
import { SnackNotificationService } from '../../../../../core/services/snackBar.service';
import { recoveryPasswordFormSchema, recoveryPasswordFormSchemaBase } from '../../../../../core/form_Schemas/recoveryPassword.form.schema.zod';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recovery-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, LabelTypeComponent,],
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.scss',
})
export class RecoveryPasswordComponent {

  private readonly securityCodeDummy = '34FG34DA';
  private readonly userValid = 'cesarreyes';
  private readonly idValid = '5656ADAD';
  protected userValidated: boolean = false;
  protected validatedUserButton: boolean = false;
  protected securityCodeVisibility: string = 'visible';
  protected codeValidated: boolean = false;
  protected showActionValidateUser: boolean = true;
  private subscriptions = new Subscription();
  protected recoveryPasswordForm: FormGroup<IRecoveryPasswordForm>;

  constructor(private readonly fb: FormBuilder, private readonly snackbar: SnackNotificationService) {
    this.recoveryPasswordForm = this.fb.group<IRecoveryPasswordForm>({

      username: this.fb.control('', {
        validators: [zodValidator(recoveryPasswordFormSchemaBase.shape.username)],
        nonNullable: false,
      }),
      idUser: this.fb.control('', {
        validators: [zodValidator(recoveryPasswordFormSchemaBase.shape.idUser)],
        nonNullable: false,
      }),
      securityCode: this.fb.control('', {
        validators: [zodValidator(recoveryPasswordFormSchemaBase.shape.securityCode)],
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

  ngOnInit() {
    // Establece explícitamente el estado inicial
    this.securityCodeVisibility = 'hidden';

    this.subscriptions.add(
      this.recoveryPasswordForm.get('password')?.valueChanges.subscribe(() => {
        this.recoveryPasswordForm.get('confirmPassword')?.updateValueAndValidity();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


  protected validateCodeSecurity() {

    const valueInputCode = this.recoveryPasswordForm.get('securityCode')?.value;

    if (valueInputCode !== this.securityCodeDummy) {

      this.snackbar.error("Código no coincide, intente nuevamente", 5000);
    }
    else {

      this.setCodeValidated(true);
      this.setUserValidated(false);
      this.setShowActionValidateUser(false);
      this.snackbar.success('Codigo correcto, coloque su nueva contraseña', 5000)
    }
  }

  protected validateUser() {

    const user = this.recoveryPasswordForm.get('username')?.value;
    const idUser = this.recoveryPasswordForm.get('idUser')?.value;

    console.log(this.recoveryPasswordForm.getRawValue());


    if (user !== this.userValid || idUser !== this.idValid) {

      this.changeStatusUser(false);
      this.setUserValidated(false);
      this.snackbar.error("Usuario no valido, intente nuevamente", 5000);
    }
    else {

      this.changeStatusUser(true);
      this.setUserValidated(true);
      this.setShowActionValidateUser(false);
    }
  }

  protected getValueForm() {

    console.log(this.recoveryPasswordForm.getRawValue());

  }

  private changeStatusUser(status: boolean) {

    this.securityCodeVisibility = status ? 'visible' : 'hidden';
  }


  protected getUserValidated(): boolean {

    return this.userValidated;
  }

  protected getCodeValidated(): boolean {

    return this.codeValidated;
  }

  protected getShowActionValidateUser(): boolean {

    return this.showActionValidateUser;
  }

  protected setShowActionValidateUser(status: boolean): void {

    this.showActionValidateUser = status;
  }

  protected setUserValidated(status: boolean): void {

    this.userValidated = status;
  }

  protected setCodeValidated(status: boolean): void {

    this.codeValidated = status;
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
