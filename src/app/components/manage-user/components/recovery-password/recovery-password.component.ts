import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IRecoveryPasswordForm } from '../../../../../core/interfaces';

@Component({
  selector: 'app-recovery-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.scss'
})
export class RecoveryPasswordComponent {

  // protected recoveryPasswordForm : FormGroup<IRecoveryPasswordForm>;

  // constructor(private fb : FormBuilder){
  //   this.recoveryPasswordForm = this.fb.group<IRecoveryPasswordForm>({

  //   })

  // }
}
