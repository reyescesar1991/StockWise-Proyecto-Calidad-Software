import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IModifyProductForm } from '../../../../../core/interfaces';
import { zodValidator } from '../../../../../core/zodValidator/zod.validator';
import { modifyProductFormSchema } from '../../../../../core/form_Schemas';
import { LabelTypeComponent } from '../../../../../shared/label-type/label-type.component';

@Component({
  selector: 'app-modify-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgIf, LabelTypeComponent],
  templateUrl: './modify-product.component.html',
  styleUrl: './modify-product.component.scss'
})
export class ModifyProductComponent {


  protected product: string = '';
  protected modifyProductForm: FormGroup<IModifyProductForm>;
  protected selectedFile: File | null = null;

  constructor(private readonly fb: FormBuilder) {

    this.modifyProductForm = this.fb.group<IModifyProductForm>({

      productCode: this.fb.control('FRUT-001',
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
      sellingPrice: this.fb.control(0.11, 
        {
          validators: [zodValidator(modifyProductFormSchema.shape.sellingPrice)],
          nonNullable: false,
        }
      ),
      costPrice: this.fb.control(0.1, 
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
      minStock: this.fb.control(10, 
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

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      // Asigna el File al FormControl SIN usar setValue
      this.modifyProductForm.patchValue({
        productImage: this.selectedFile
      });
    } else {
      this.modifyProductForm.patchValue({ productImage: null });
    }

    // Fuerza la validación
    this.modifyProductForm.get('productImage')?.updateValueAndValidity();
  }

}
