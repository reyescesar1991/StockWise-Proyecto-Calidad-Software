import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IModifyProductForm } from '../../../../../core/interfaces';
import { zodValidator } from '../../../../../core/zodValidator/zod.validator';
import { modifyProductFormSchema } from '../../../../../core/form_Schemas';

@Component({
  selector: 'app-modify-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './modify-product.component.html',
  styleUrl: './modify-product.component.scss'
})
export class ModifyProductComponent {


  protected product: string = '';
  protected modifyProductForm: FormGroup<IModifyProductForm>;

  constructor(private fb: FormBuilder) {

    this.modifyProductForm = this.fb.group<IModifyProductForm>({

      productCode: this.fb.control('',
        {
          validators: [zodValidator(modifyProductFormSchema.shape.productCode)],
          nonNullable: false,
        }
      ),
      nameProduct: this.fb.control('',
        {
          validators: [zodValidator(modifyProductFormSchema.shape.nameProduct)],
          nonNullable: false,
        }
      ),
      description: this.fb.control('',
        {
          validators: [zodValidator(modifyProductFormSchema.shape.description)],
          nonNullable: false,
        }
      ),
      category: this.fb.control('', 
        {
          validators: [zodValidator(modifyProductFormSchema.shape.category)],
          nonNullable: false
        }
      ),
      sellingPrice: this.fb.control(null, 
        {
          validators: [zodValidator(modifyProductFormSchema.shape.sellingPrice)],
          nonNullable: false,
        }
      ),
      costPrice: this.fb.control(null, 
        {
          validators: [zodValidator(modifyProductFormSchema.shape.costPrice)],
          nonNullable: false,
        }
      ),
      unit: this.fb.control('', 
        {
          validators: [zodValidator(modifyProductFormSchema.shape.unit)],
          nonNullable: false,
        }
      ),
      minStock: this.fb.control(null, 
        {
          validators: [zodValidator(modifyProductFormSchema.shape.minStock)],
          nonNullable: false,
        }
      ),
      productStatus: this.fb.control('', 
        {
          validators: [zodValidator(modifyProductFormSchema.shape.productStatus)],
          nonNullable: false,
        }
      ),
      statusReason: this.fb.control('', 
        {
          validators: [zodValidator(modifyProductFormSchema.shape.statusReason)],
          nonNullable: false
        }
      ),
      productImage: this.fb.control(null, 
        {
          validators: [zodValidator(modifyProductFormSchema.shape.productImage)],
          nonNullable: false,
        }
      ),
    })
  }


  protected findProduct() {


  }

  protected getValueForm(){

    console.log(this.modifyProductForm.getRawValue());
    
  }

}
