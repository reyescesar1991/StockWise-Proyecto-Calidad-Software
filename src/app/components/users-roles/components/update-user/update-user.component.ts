import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PERMISSIONS_LIST, USER_PERMISSIONS_SECURITY } from '../../../../../core/constants';
import { IUpdateUserForm } from '../../../../../core/interfaces';
import { zodValidator } from '../../../../../core/zodValidator/zod.validator';
import { updateUserFormSchema } from '../../../../../core/form_Schemas';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {

  protected userFound : boolean = false;
  protected user : string = '';
  protected activeTab: string = 'personal'; // Tab inicial
  protected arrayPermissions = PERMISSIONS_LIST;
  protected arrayUserSecurity = USER_PERMISSIONS_SECURITY;
  protected updateUserForm : FormGroup<IUpdateUserForm>;

  constructor(private readonly fb : FormBuilder){

    this.updateUserForm = this.fb.group<IUpdateUserForm>({

      idUser : this.fb.control('' , 
        {
          validators : [zodValidator(updateUserFormSchema.shape.idUser)],
          nonNullable : false,
        }
      ),
      email : this.fb.control('' , 
        {
          validators : [zodValidator(updateUserFormSchema.shape.email)],
          nonNullable : false,
        }
      ),
      nameUser : this.fb.control('' , 
        {
          validators : [zodValidator(updateUserFormSchema.shape.nameUser)],
          nonNullable : false,
        }
      ),
      lastNameUser : this.fb.control('' , 
        {
          validators : [zodValidator(updateUserFormSchema.shape.lastNameUser)],
          nonNullable : false,
        }
      ),
      address : this.fb.control('' , 
        {
          validators : [zodValidator(updateUserFormSchema.shape.address)],
          nonNullable : false,
        }
      ),
      phoneNumber : this.fb.control('' , 
        {
          validators : [zodValidator(updateUserFormSchema.shape.phoneNumber)],
          nonNullable : false,
        }
      ),
      codeCountry : this.fb.control('' , 
        {
          validators : [zodValidator(updateUserFormSchema.shape.codeCountry)],
          nonNullable : false,
        }
      ),
      rol : this.fb.control('' , 
        {
          validators : [zodValidator(updateUserFormSchema.shape.rol)],
          nonNullable : false,
        }
      ),
      headquarters : this.fb.control('' , 
        {
          validators : [zodValidator(updateUserFormSchema.shape.headquarters)],
          nonNullable : false,
        }
      ),
      department : this.fb.control('' , 
        {
          validators : [zodValidator(updateUserFormSchema.shape.department)],
          nonNullable : false,
        }
      ),
      position : this.fb.control('' , 
        {
          validators : [zodValidator(updateUserFormSchema.shape.position)],
          nonNullable : false,
        }
      ),
      hireDate : this.fb.control('' , 
        {
          validators : [zodValidator(updateUserFormSchema.shape.hireDate)],
          nonNullable : false,
        }
      ),
      permissions : this.fb.control(this.arrayPermissions, 
        {
          validators : [zodValidator(updateUserFormSchema.shape.permissions)],
          nonNullable : false,
        }
      ),
      permissionsSecurity : this.fb.control(this.arrayUserSecurity, 
        {
          validators : [zodValidator(updateUserFormSchema.shape.permissionsSecurity)],
          nonNullable : false,
        }
      )
    })

    console.log(this.updateUserForm.getRawValue());
    
  }


  protected searchUser(){

    if(this.user !== ''){
      this.userFound = true;
    }
  }

  protected resetSearchUser(){

    this.user = '';
    this.userFound = false;
  }
  
  // Método para cambiar de tab
  protected changeTab(tab: string): void {
    this.activeTab = tab;
  }

  // Método para verificar si un tab está activo
  protected isTabActive(tab: string): boolean {
    return this.activeTab === tab;
  }

  protected updatePermissionSecurity(permissionName : string) : void{

    const pem = this.arrayUserSecurity.find(p => p.permission === permissionName);

    if(pem){

      const checked = !pem.can;
      pem.can = checked;
    }
  }

  protected updatePermission(permissionName : string) : void{

    const pem = this.arrayPermissions.find(p => p.permission === permissionName);

    if(pem){

      const checked = !pem.can;
      pem.can = checked;
    }
  }
}
