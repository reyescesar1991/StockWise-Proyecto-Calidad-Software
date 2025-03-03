import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IRegistryProductForm } from '../../../../../core/interfaces';
import { zodValidator } from '../../../../../core/zodValidator/zod.validator';
import { registryProductFormSchema } from '../../../../../core/form_Schemas';
import { LabelTypeComponent } from '../../../../../shared/label-type/label-type.component';

@Component({
  selector: 'app-product-registry',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgIf, LabelTypeComponent],
  templateUrl: './product-registry.component.html',
  styleUrl: './product-registry.component.scss'
})
export class ProductRegistryComponent {

  protected registryProductForm: FormGroup<IRegistryProductForm>;

  constructor(private fb: FormBuilder){

    this.registryProductForm = this.fb.group<IRegistryProductForm>({

      name : this.fb.control('' , {
        validators : [zodValidator(registryProductFormSchema.shape.name)],
        nonNullable: false,
      }),

      description : this.fb.control('' , {
        validators : [zodValidator(registryProductFormSchema.shape.description)],
        nonNullable: false,
      }),

      category: this.fb.control('' , {
        validators : [zodValidator(registryProductFormSchema.shape.category)],
        nonNullable : false,
      }),

      unit: this.fb.control('' , {
        validators : [zodValidator(registryProductFormSchema.shape.unit)],
        nonNullable : false,
      }),

      sellingPrice: this.fb.control(0 , {
        validators : [zodValidator(registryProductFormSchema.shape.sellingPrice)],
        nonNullable: false,
      }),

      costPrice : this.fb.control(0 , {

        validators : [zodValidator(registryProductFormSchema.shape.costPrice)],
        nonNullable: false,
      }),

      initialStock: this.fb.control(0, {
        validators: [zodValidator(registryProductFormSchema.shape.initialStock)],
        nonNullable: false,
      }),

      minStock: this.fb.control(0, {
        validators: [zodValidator(registryProductFormSchema.shape.minStock)],
        nonNullable: false,
      }),

      productImage: this.fb.control(null, {
        validators: [zodValidator(registryProductFormSchema.shape.productImage)],
        nonNullable : false,
      })
    })
  }

}
