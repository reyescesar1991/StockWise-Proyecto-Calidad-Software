import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IAdjustProductStockForm } from '../../../../../core/interfaces';
import { zodValidator } from '../../../../../core/zodValidator/zod.validator';
import { adjustProductStockFormSchema } from '../../../../../core/form_Schemas';
import { FunctionDateService } from '../../../../../core/functions/date.functions';
import { LabelTypeComponent } from '../../../../../shared/label-type/label-type.component';

@Component({
  selector: 'app-adjust-product-stock',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgIf, LabelTypeComponent],
  templateUrl: './adjust-product-stock.component.html',
  styleUrl: './adjust-product-stock.component.scss',
  providers: [DatePipe, FunctionDateService]
})
export class AdjustProductStockComponent {

  protected adjustProductForm : FormGroup<IAdjustProductStockForm>;
  protected today = new Date();

  constructor(private readonly fb : FormBuilder, private readonly functionDateService : FunctionDateService){

    this.adjustProductForm = this.fb.group<IAdjustProductStockForm>({

      nameProduct : this.fb.control('', 
        {
          validators : [zodValidator(adjustProductStockFormSchema.shape.productName)],
          nonNullable: false,
        }
      ),
      actualStock : this.fb.control(1, 
        {
          validators : [zodValidator(adjustProductStockFormSchema.shape.actualStock)],

        }
      ),
      adjustmentReason : this.fb.control('', 
        {
          validators : [zodValidator(adjustProductStockFormSchema.shape.adjustmentReason)],
          nonNullable: false,
        }
      ),
      adjustmentDetails : this.fb.control('', 
        {
          validators : [zodValidator(adjustProductStockFormSchema.shape.adjustmentDetails)],
          nonNullable : false,
        }
      ),
      dateAdjust: this.fb.control(this.functionDateService.formatDateToYYYYMMDD(this.today), 
        {
          validators: [zodValidator(adjustProductStockFormSchema.shape.dateAdjust)],
          nonNullable: false,
        }
      ),
      adjustedBy : this.fb.control('', 
        {
          validators : [zodValidator(adjustProductStockFormSchema.shape.adjustedBy)],
          nonNullable: false,
        }
      )
    })
  }

  protected getFormValue(){

    console.log(this.adjustProductForm.getRawValue());
    
  }

}
