import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { loginFormSchema } from '../../../../../core/form_Schemas';
import { zodValidator } from '../../../../../core/zodValidator/zod.validator';
import { NgIf } from '@angular/common';
import { ILoginForm } from '../../../../../core/interfaces';
import { LabelTypeComponent } from '../../../../../shared/label-type/label-type.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, LabelTypeComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  protected formLogin: FormGroup<ILoginForm>;

  constructor(private fb: FormBuilder) {
    this.formLogin = this.fb.group<ILoginForm>({
      username: this.fb.control('', {
        validators: [zodValidator(loginFormSchema.shape.username)],
        nonNullable: false
      }),
      password: this.fb.control('', {
        validators: [zodValidator(loginFormSchema.shape.password)],
        nonNullable: false
      })
    });

    // Para debugging
    this.formLogin.valueChanges.subscribe(value => {
      console.log('Form values:', value);
      console.log('Form errors:', this.formLogin.errors);
      console.log('Username errors:', this.formLogin.get('username')?.errors);
      console.log('Password errors:', this.formLogin.get('password')?.errors);
    });
  }

  protected getValueForm(){

    console.log(this.formLogin.getRawValue());
    
  }
}
