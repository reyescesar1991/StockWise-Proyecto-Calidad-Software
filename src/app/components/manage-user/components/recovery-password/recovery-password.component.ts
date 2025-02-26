import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IRecoveryPasswordForm } from '../../../../../core/interfaces';
import { zodValidator } from '../../../../../core/zodValidator/zod.validator';
import { recoveryPasswordFormSchema } from '../../../../../core/form_Schemas/recoveryPassword.form.schema.zod';
import { NgIf } from '@angular/common';
import { LabelTypeComponent } from '../../../../../shared/label-type/label-type.component';
import { SnackNotificationService } from '../../../../../core/services/snackBar.service';

@Component({
  selector: 'app-recovery-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, LabelTypeComponent],
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.scss'
})
export class RecoveryPasswordComponent {

  private readonly securityCodeDummy = '34FG34DA';
  private readonly userValid = 'cesarreyes';
  private readonly idValid = '5656ADAD';
  protected userValidated = false;
  protected validatedUserButton = false;

  protected recoveryPasswordForm : FormGroup<IRecoveryPasswordForm>;

  constructor(private fb : FormBuilder, private snackbar: SnackNotificationService){
    this.recoveryPasswordForm = this.fb.group<IRecoveryPasswordForm>({

      username : this.fb.control('', {
        validators: [zodValidator(recoveryPasswordFormSchema.shape.username)],
        nonNullable: false,
      }),
      idUser : this.fb.control('', {
        validators: [zodValidator(recoveryPasswordFormSchema.shape.idUser)],
        nonNullable: false,
      }),
      securityCode : this.fb.control('', {
        validators : [zodValidator(recoveryPasswordFormSchema.shape.securityCode)],
        nonNullable: false,
      }),
    })

  }


  protected validateCodeSecurity(){

    const valueInputCode = this.recoveryPasswordForm.get('securityCode')?.value;

    if(valueInputCode !== this.securityCodeDummy){


    }
  }

  protected validateUser(){

    const user = this.recoveryPasswordForm.get('username')?.value;
    const idUser = this.recoveryPasswordForm.get('idUser')?.value;

    console.log(this.recoveryPasswordForm.getRawValue());
    
    
    if(user !== this.userValid || idUser !== this.idValid){

      this.changeStatusUser(false);
      this.snackbar.error("Usuario no valido, intente nuevamente", 5000);
    }
    else{

      this.changeStatusUser(true);
    }
  }

  protected getValueForm(){

    console.log(this.recoveryPasswordForm.getRawValue());
    
  }

  private changeStatusUser(status : boolean){

    this.userValidated = status;
  }
}
