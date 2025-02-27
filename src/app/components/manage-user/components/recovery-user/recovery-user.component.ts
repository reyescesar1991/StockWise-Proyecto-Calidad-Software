import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IRecoveryUserForm } from '../../../../../core/interfaces';
import { zodValidator } from '../../../../../core/zodValidator/zod.validator';
import { recoveryUserFormSchema } from '../../../../../core/form_Schemas';
import { LabelTypeComponent } from '../../../../../shared/label-type/label-type.component';
import { SnackNotificationService } from '../../../../../core/services/snackBar.service';

@Component({
  selector: 'app-recovery-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgIf, LabelTypeComponent],
  templateUrl: './recovery-user.component.html',
  styleUrl: './recovery-user.component.scss'
})
export class RecoveryUserComponent {

  protected recoveryUserForm : FormGroup<IRecoveryUserForm>;
  private buttonValidateUser : boolean = true;
  private controlSecurityCode: boolean = false;
  private buttonSecurityCode : boolean = false;
  private buttonRecoveryUser : boolean = false;
  private readonly idValid = '5656ADAD';
  private readonly securityCodeDummy = '34FG34DA';
  protected securityCodeVisibility : string = 'visible';

  constructor(private fb : FormBuilder, private snackBar : SnackNotificationService){

    this.recoveryUserForm = this.fb.group<IRecoveryUserForm>({

      idUser : this.fb.control('', 
        { validators : [zodValidator(recoveryUserFormSchema.shape.idUser)],
          nonNullable: false,
        }
      ),
      securityCode : this.fb.control('',
        {validators: [zodValidator(recoveryUserFormSchema.shape.securityCode)],
          nonNullable: false,
        }
      )
    })
  }

  private changeStatusUser(status : boolean){

    this.securityCodeVisibility = status ? 'visible' : 'hidden';
  }


  protected getValueForm(){

    console.log(this.recoveryUserForm.getRawValue());
    
  }

  protected getButtonValidateUser() : boolean{

    return this.buttonValidateUser;
  }

  protected setButtonValidateUser(status: boolean) : void{

    this.buttonValidateUser = status;
  }

  protected validateUser(){

    const idValue = this.recoveryUserForm.get('idUser')?.value;

    if(this.idValid !== idValue){

      this.snackBar.error('El id no coincide con ninguno registrado en la base de datos', 5000);
    }
    else{

      this.changeStatusUser(true)
      this.setButtonValidateUser(false);
      this.setControlSecurityCode(true);
      this.setButtonSecurityCode(true);
    }
  }

  protected getControlSecurityCode() : boolean{

    return this.controlSecurityCode;
  }

  protected setControlSecurityCode(status : boolean) : void{

    this.controlSecurityCode = status;
  }

  protected validateSecurityCode(){

    const securityCodeValue = this.recoveryUserForm.get('securityCode')?.value;

    if(this.securityCodeDummy !== securityCodeValue){

      this.snackBar.error('El código de seguridad no coincide con el enviado, intente de nuevo', 5000);
    }
    else{

      this.setButtonSecurityCode(false);
      this.setButtonRecoveryUser(true);
      this.snackBar.success('Código correcto', 3000);
    }
  }

  protected getButtonSecurityCode() : boolean{

    return this.buttonSecurityCode;
  }

  protected setButtonSecurityCode(status : boolean) : void{

    this.buttonSecurityCode = status;
  }

  protected getButtonRecoveryUser(): boolean{

    return this.buttonRecoveryUser;
  }

  protected setButtonRecoveryUser(status : boolean) : void{

    this.buttonRecoveryUser = status;
  }
}
