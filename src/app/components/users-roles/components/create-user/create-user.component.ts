import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { PERMISSIONS_LIST } from '../../../../../core/constants';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IAddUserForm } from '../../../../../core/interfaces';
import { zodValidator } from '../../../../../core/zodValidator/zod.validator';
import { addUserFormSchema } from '../../../../../core/form_Schemas';
import { LabelTypeComponent } from '../../../../../shared/label-type/label-type.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgIf, LabelTypeComponent],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {

  protected arrayPermissions = PERMISSIONS_LIST;
  protected addUserForm : FormGroup<IAddUserForm>;
  private readonly subscriptions = new Subscription();

  constructor(private readonly fb : FormBuilder){

    this.addUserForm = this.fb.group<IAddUserForm>({

      idUser : this.fb.control('' , 
        {
          validators : [zodValidator(addUserFormSchema.shape.idUser)],
          nonNullable : false,
        }
      ),
      email : this.fb.control('' , 
        {
          validators : [zodValidator(addUserFormSchema.shape.email)],
          nonNullable : false,
        }
      ),
      nameUser : this.fb.control('' , 
        {
          validators : [zodValidator(addUserFormSchema.shape.nameUser)],
          nonNullable : false,
        }
      ),
      lastNameUser: this.fb.control('' , 
        {
          validators : [zodValidator(addUserFormSchema.shape.lastNameUser)],
          nonNullable : false,
        }
      ),
      password : this.fb.control('', 
        {
          validators : [zodValidator(addUserFormSchema.shape.password)],
          nonNullable : false,
        }
      ),
      confirmPassword : this.fb.control('' , 
        {
          validators : [this.confirmPasswordValidator()],
          nonNullable : false,
        }
      ),
      codeCountry : this.fb.control('', 
        {
          validators : [zodValidator(addUserFormSchema.shape.codeCountry)],
          nonNullable : false,
        }
      ),
      phoneNumber : this.fb.control('' , 
        {
          validators : [zodValidator(addUserFormSchema.shape.phoneNumber)],
          nonNullable : false,
        }
      ),
      address : this.fb.control('', 
        {
          validators : [zodValidator(addUserFormSchema.shape.address)],
          nonNullable : false,
        }
      ),
      rol : this.fb.control('', 
        {
          validators : [zodValidator(addUserFormSchema.shape.rol)],
          nonNullable: false,
        }
      ),
      headquarters : this.fb.control('', 
        {
          validators : [zodValidator(addUserFormSchema.shape.headquarters)],
          nonNullable : false,
        }
      ),
      department : this.fb.control('', 
        {
          validators : [zodValidator(addUserFormSchema.shape.department)],
          nonNullable : false,
        }
      ),
      job : this.fb.control('', {
        validators : [zodValidator(addUserFormSchema.shape.job)],
        nonNullable : false,
      }),
      permissions : this.fb.control(this.arrayPermissions, 
        {
          validators : [zodValidator(addUserFormSchema.shape.permissions)],
          nonNullable : false,
        }
      ),
      notes : this.fb.control('', 
        {
          validators : [zodValidator(addUserFormSchema.shape.notes)],
          nonNullable : false,
        }
      )
    });

    console.log(this.addUserForm.getRawValue());
  }

  ngOnInit(){

    this.subscriptions.add(
      this.addUserForm.get('password')?.valueChanges.subscribe(() => {
        this.addUserForm.get('confirmPassword')?.updateValueAndValidity();
      })
    );
  }

  ngOnDestroy(){

    this.subscriptions.unsubscribe();
  }


  // Para vincular con los checkboxes
  getPermissionDetail(permissionKey: string): boolean {
    return this.arrayPermissions.find(p => p.permission === permissionKey)?.can || false;
  }

  updatePermission(permissionKey: string): void {
    const perm = this.arrayPermissions.find(p => p.permission === permissionKey);
    if (perm) {
      const checked = !perm.can;
      perm.can = checked;
    }

    console.log(this.arrayPermissions);
    console.log(this.addUserForm.get('permissions')?.value);
    
    
  }
  
  protected getPermissions(){

    console.log(this.arrayPermissions);
    
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
