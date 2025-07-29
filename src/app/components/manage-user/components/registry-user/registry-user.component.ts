import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IRegistryUserForm } from '../../../../../core/interfaces';
import { zodValidator } from '../../../../../core/zodValidator/zod.validator';
import { registryUserFormSchema } from '../../../../../core/form_Schemas';
import { ICountry, IHeadquarter, IRol } from '../../../../../core/models';
import { LabelTypeComponent } from '../../../../../shared/label-type/label-type.component';
import { IDepartment } from '../../../../../core/models/department.model';
import { RoleConfigService } from '../../../../../core/services/configRole.service';
import { ApiResponse } from '../../../../../core/interfaces/api/api-response.interface';
import { IGetRolesResponse, IRoles } from '../../../../../core/interfaces/roles/rolesConfig.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarComponent } from '../../../../../shared/snack-bar/snack-bar.component';
import { SnackNotificationService } from '../../../../../core/services/snackBar.service';
import { HeadquarterService } from '../../../../../core/services/headquarter.service';
import { IHeadquarterIdRequest, IHeadquarterResponse, IHeadquarters } from '../../../../../core/interfaces/location/headquarter/getHeadquarters.interface';
import { IDepartmentResponse, IDepartments } from '../../../../../core/interfaces/location/department/getDepartments.interface';
import { DepartmentService } from '../../../../../core/services/department.service';
import { UserDataService } from '../../../../../core/services/userData.service';
import { ICreateUserRequest } from '../../../../../core/interfaces/user/createUserRequest.interface';
import { UserService } from '../../../../../core/services/user.service';

@Component({
  selector: 'app-registry-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgIf, LabelTypeComponent],
  templateUrl: './registry-user.component.html',
  styleUrl: './registry-user.component.scss'
})
export class RegistryUserComponent {

  protected registryUserForm: FormGroup<IRegistryUserForm>;
  // protected roles: IRol[] = [
  //   {
  //     id: 1,
  //     nombre: "Empleado de Almacén",
  //     descripcion: "Rol básico para empleados que realizan tareas operativas en el almacén, como registrar entradas y salidas de stock.",
  //     permisos: ["ver_inventario", "registrar_entrada_stock", "registrar_salida_stock"]
  //   },
  //   {
  //     id: 2,
  //     nombre: "Supervisor de Inventario",
  //     descripcion: "Rol para supervisores que gestionan el flujo de inventario, realizan ajustes de stock y generan informes básicos.",
  //     permisos: ["ver_inventario", "registrar_entrada_stock", "registrar_salida_stock", "ajustar_stock", "generar_informes_basicos"]
  //   },
  //   {
  //     id: 3,
  //     nombre: "Gestor de Inventario",
  //     descripcion: "Rol con mayor control sobre el inventario, encargado de la gestión de categorías, proveedores, y análisis de stock.",
  //     permisos: ["ver_inventario", "registrar_entrada_stock", "registrar_salida_stock", "ajustar_stock", "gestionar_categorias", "gestionar_proveedores", "generar_informes_avanzados", "analizar_stock"]
  //   },
  //   {
  //     id: 4,
  //     nombre: "Administrador de Inventario",
  //     descripcion: "Rol con acceso total al sistema de gestión de inventarios, incluyendo configuración del sistema, gestión de usuarios y roles, y control total sobre el inventario.",
  //     permisos: ["*"] // Comodín para acceso total. En un sistema real, listarías permisos detallados.
  //   }
  // ];

  protected countries: Array<ICountry> = [

    { idPais: '+58' }
  ]

  protected headquarterIsSelected: boolean = false;

  protected headquarters: Array<IHeadquarterResponse> = []

  protected departments: Array<IDepartmentResponse> = [] 

  private idHeadquarter : string = '';

  private roleConfigService = inject(RoleConfigService);
  private headquarterService = inject(HeadquarterService);
  private departmentService = inject(DepartmentService);
  private snackbar = inject(SnackNotificationService);
  private userService = inject(UserService);
  protected roles : IGetRolesResponse[] = [];

  constructor(private fb: FormBuilder) {

    this.registryUserForm = this.fb.group<IRegistryUserForm>({

      idUser: this.fb.control('', {
        validators: [zodValidator(registryUserFormSchema.shape.idUser)],
        nonNullable: false,
      }),

      name: this.fb.control('', {
        validators: [zodValidator(registryUserFormSchema.shape.name)],
        nonNullable: false,
      }),

      username: this.fb.control('', {
        validators: [zodValidator(registryUserFormSchema.shape.username)],
        nonNullable: false,
      }),

      lastName: this.fb.control('', {
        validators: [zodValidator(registryUserFormSchema.shape.lastName)],
        nonNullable: false,
      }),

      rol: this.fb.control('',
        {
          validators: [zodValidator(registryUserFormSchema.shape.rol)],
          nonNullable: false,
        }
      ),

      password: this.fb.control('',
        {
          validators: [zodValidator(registryUserFormSchema.shape.password)],
          nonNullable: false,
        }
      ),

      email: this.fb.control('', {

        validators: [zodValidator(registryUserFormSchema.shape.email)],
        nonNullable: false,
      }),

      codeCountry: this.fb.control('+58',
        {
          validators: [zodValidator(registryUserFormSchema.shape.codeCountry)],
          nonNullable: false,
        }
      ),
      headquarters: this.fb.control('',
        {
          validators: [zodValidator(registryUserFormSchema.shape.headquarters)],
          nonNullable: false,
        }
      ),

      secondFactorAuth: this.fb.control('habilitado',
        {
          validators: [zodValidator(registryUserFormSchema.shape.secondFactorAuth)],
          nonNullable: false,
        }
      ),

      department: this.fb.control('',
        {
          validators: [zodValidator(registryUserFormSchema.shape.department)],
          nonNullable: false,
        }
      ),

      phoneNumber: this.fb.control('',
        {
          validators: [zodValidator(registryUserFormSchema.shape.phoneNumber)],
          nonNullable: false,
        }
      ),
    })
  }

  ngOnInit(): void {
    this.getRoles();
    this.getHeadquarter();
  }

  protected getRole(role : string){

    console.log(role);
    
  }

  private getDepartments(): void {

    const params : IHeadquarterIdRequest = {
      idHeadquarter : this.idHeadquarter
    }

    console.log(params);
    

    this.departmentService.getDepartments(params).subscribe({
      next: (response) => this.handleGetDepartmentsSuccess(response),
      error: (response) => this.handleGetDepartmentsError(response)
    });
  }

  private handleGetDepartmentsSuccess(response: ApiResponse<IDepartments>): void {

    console.log(response.data);
    
    this.departments = response.data.departments;

    console.log(this.departments);
    
  }

  private handleGetDepartmentsError(response: HttpErrorResponse): void {

    console.log(response
    );
    

    this.snackbar.error(response.error.message, 10000);
  }


  private getHeadquarter(): void {

    this.headquarterService.getHeadquarters().subscribe({
      next: (response) => this.handleGetHeadquarterSuccess(response),
      error: (response) => this.handleGetHeadquarterError(response)
    });
  }

  private handleGetHeadquarterSuccess(response: ApiResponse<IHeadquarters>): void {

    console.log(response.data);
    
    this.headquarters = response.data.headquarters;

    console.log(this.headquarters);
    
  }

  private handleGetHeadquarterError(response: HttpErrorResponse): void {
    console.log(response);
    this.snackbar.error(response.error.message, 10000);
  }

  private getRoles(): void {

    this.roleConfigService.getRoles().subscribe({
      next: (response) => this.handleGetRolesSuccess(response),
      error: (response) => this.handleGetRolesError(response)
    });
  }

  private handleGetRolesSuccess(response: ApiResponse<IRoles>): void {

    console.log(response.data);
    
    this.roles = response.data.roles;

    console.log(this.roles);
    
  }

  private handleGetRolesError(response: HttpErrorResponse): void {
    console.log(response);
    this.snackbar.error(response.error.message, 10000);
  }

  protected getValueForm() {

    console.log(this.registryUserForm.getRawValue());

    const params : ICreateUserRequest = {

      idUser : this.registryUserForm.get('idUser')?.value as string,
      name : this.registryUserForm.get('name')?.value as string,
      lastName : this.registryUserForm.get('lastName')?.value as string,
      codeCountry : this.registryUserForm.get('codeCountry')?.value as string,
      phoneNumber : this.registryUserForm.get('phoneNumber')?.value as string,
      email : this.registryUserForm.get('email')?.value as string,
      password : this.registryUserForm.get('password')?.value as string,
      username : this.registryUserForm.get('username')?.value as string,
      status : 'activo',
      hasTwoFactor : (this.registryUserForm.get('secondFactorAuth')?.value === 'habilitado' ? true : false) as boolean,
      department : this.registryUserForm.get('department')?.value as string,
      roleConfig : this.registryUserForm.get('rol')?.value as string,
    }

    console.log(params);
    
    this.userService.createUser(params).subscribe({
      next: (response) => this.handleCreateUserSuccess(response),
      error: (response) => this.handleCreateUserError(response)
    });
  }

  private handleCreateUserSuccess(response: ApiResponse<any>): void {
    this.snackbar.success(response.message, 10000);
  }

  private handleCreateUserError(response: HttpErrorResponse): void {
    this.snackbar.error(response.error.message, 10000);
  }

  protected selectHeadquarter(headquarter: string) {

    this.idHeadquarter = headquarter;

    console.log(this.idHeadquarter);

    this.getDepartments();

  }
}
