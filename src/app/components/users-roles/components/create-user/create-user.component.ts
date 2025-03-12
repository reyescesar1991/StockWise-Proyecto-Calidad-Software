import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { PERMISSIONS_LIST } from '../../../../../core/constants';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IAddUserForm } from '../../../../../core/interfaces';
import { zodValidator } from '../../../../../core/zodValidator/zod.validator';
import { addUserFormSchema } from '../../../../../core/form_Schemas';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {

  protected arrayPermissions = PERMISSIONS_LIST;
  protected addUserForm : FormGroup<IAddUserForm>;

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
          validators : [zodValidator(addUserFormSchema.shape.confirmPassword)],
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
}
