import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IRegistryStockForm } from '../../../../../core/interfaces';
import { zodValidator } from '../../../../../core/zodValidator/zod.validator';
import { addStockFormSchema } from '../../../../../core/form_Schemas';
import { FunctionDateService } from '../../../../../core/functions/date.functions';
import { LabelTypeComponent } from '../../../../../shared/label-type/label-type.component';

@Component({
  selector: 'app-add-stock',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgIf, LabelTypeComponent],
  templateUrl: './add-stock.component.html',
  styleUrl: './add-stock.component.scss',
  providers: [DatePipe, FunctionDateService]
})
export class AddStockComponent {

  protected addStockForm : FormGroup<IRegistryStockForm>;
  protected today = new Date();

  constructor(private fb : FormBuilder, private readonly functionDateService : FunctionDateService){

    this.addStockForm = this.fb.group<IRegistryStockForm>({

      nameProduct: this.fb.control('' , 
        {
          validators : [zodValidator(addStockFormSchema.shape.productName)],
          nonNullable: false,
        }
      ),
      quantityReceived: this.fb.control(1, 
        {
          validators: [zodValidator(addStockFormSchema.shape.quantityReceived)],
          nonNullable: false,
        }
      ),
      receptionDate: this.fb.control(this.functionDateService.formatDateToYYYYMMDD(this.today), 
        {
          validators: [zodValidator(addStockFormSchema.shape.receptionDate)],
          nonNullable: false,
        }
      ),
      supplier: this.fb.control('', 
        {
          validators : [zodValidator(addStockFormSchema.shape.supplier)],
          nonNullable: false
        }
      ),
      batchNumber: this.fb.control('', 
        {
          validators : [zodValidator(addStockFormSchema.shape.batchNumber)],
          nonNullable: false,
        }
      ),
      notes: this.fb.control('' , 
        {
          validators: [zodValidator(addStockFormSchema.shape.notes)],
          nonNullable: false,
        }
      )
    })
  }


  protected getFormValue(){

    console.log(this.addStockForm.getRawValue());
    
  }

}
