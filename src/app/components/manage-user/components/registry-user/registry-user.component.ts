import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IRegistryUserForm } from '../../../../../core/interfaces';
import { zodValidator } from '../../../../../core/zodValidator/zod.validator';
import { registryUserFormSchema } from '../../../../../core/form_Schemas';
import { ICountry, IHeadquarter, IRol } from '../../../../../core/models';
import { LabelTypeComponent } from '../../../../../shared/label-type/label-type.component';

@Component({
  selector: 'app-registry-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgIf, LabelTypeComponent],
  templateUrl: './registry-user.component.html',
  styleUrl: './registry-user.component.scss'
})
export class RegistryUserComponent {

  protected registryUserForm: FormGroup<IRegistryUserForm>;
  protected roles: IRol[] = [
    {
      id: 1,
      nombre: "Empleado de Almacén",
      descripcion: "Rol básico para empleados que realizan tareas operativas en el almacén, como registrar entradas y salidas de stock.",
      permisos: ["ver_inventario", "registrar_entrada_stock", "registrar_salida_stock"]
    },
    {
      id: 2,
      nombre: "Supervisor de Inventario",
      descripcion: "Rol para supervisores que gestionan el flujo de inventario, realizan ajustes de stock y generan informes básicos.",
      permisos: ["ver_inventario", "registrar_entrada_stock", "registrar_salida_stock", "ajustar_stock", "generar_informes_basicos"]
    },
    {
      id: 3,
      nombre: "Gestor de Inventario",
      descripcion: "Rol con mayor control sobre el inventario, encargado de la gestión de categorías, proveedores, y análisis de stock.",
      permisos: ["ver_inventario", "registrar_entrada_stock", "registrar_salida_stock", "ajustar_stock", "gestionar_categorias", "gestionar_proveedores", "generar_informes_avanzados", "analizar_stock"]
    },
    {
      id: 4,
      nombre: "Administrador de Inventario",
      descripcion: "Rol con acceso total al sistema de gestión de inventarios, incluyendo configuración del sistema, gestión de usuarios y roles, y control total sobre el inventario.",
      permisos: ["*"] // Comodín para acceso total. En un sistema real, listarías permisos detallados.
    }
  ];

  protected countries : Array<ICountry> = [

    {idPais : '+58'}
  ]

  protected headquarters : Array<IHeadquarter> = [
    {
      idHeadquarter : '01',
      nameHeadquarter: 'Caracas'
    },
    {
      idHeadquarter : '02',
      nameHeadquarter : 'Valencia'
    },
    {
      idHeadquarter : '03',
      nameHeadquarter : 'Barquisimeto'
    }
  ]

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

      codeCountry: this.fb.control('',
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

      phoneNumber: this.fb.control('',
        {
          validators: [zodValidator(registryUserFormSchema.shape.phoneNumber)],
          nonNullable: false,
        }
      ),
    })
  }

  protected getValueForm(){
    
    console.log(this.registryUserForm.getRawValue());
    
  }
}
