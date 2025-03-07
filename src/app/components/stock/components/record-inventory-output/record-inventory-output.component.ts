import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IRegistrySaleStockForm } from '../../../../../core/interfaces';
import { zodValidator } from '../../../../../core/zodValidator/zod.validator';
import { registrySaleStockFormSchema } from '../../../../../core/form_Schemas';
import { FunctionDateService } from '../../../../../core/functions/date.functions';

@Component({
  selector: 'app-record-inventory-output',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './record-inventory-output.component.html',
  styleUrl: './record-inventory-output.component.scss',
  providers: [DatePipe, FunctionDateService]
})
export class RecordInventoryOutputComponent {

  protected recordOuputInventoryForm: FormGroup<IRegistrySaleStockForm>;
  protected today = new Date();


  constructor(private readonly fb: FormBuilder, private readonly functionDateService : FunctionDateService) {

    this.recordOuputInventoryForm = this.fb.group<IRegistrySaleStockForm>({

      outflowType: this.fb.control('',
        {
          validators: [zodValidator(registrySaleStockFormSchema.shape.outflowType)],
          nonNullable: false,
        }
      ),
      nameProduct: this.fb.control('',
        {
          validators: [zodValidator(registrySaleStockFormSchema.shape.nameProduct)],
          nonNullable: false,
        }
      ),
      quantitySale: this.fb.control(1, {
        validators: [zodValidator(registrySaleStockFormSchema.shape.quantitySale)],
        nonNullable: false,
      }
      ),
      mermaReason: this.fb.control('', 
        {
          validators : [zodValidator(registrySaleStockFormSchema.shape.mermaReason)],
          nonNullable: false,
        }
      ),
      mermaDetails: this.fb.control('' , 
        {
          validators: [zodValidator(registrySaleStockFormSchema.shape.mermaDetails)],
          nonNullable: false,
        }
      ),
      salePrice: this.fb.control(0 , 
        {
          validators : [zodValidator(registrySaleStockFormSchema.shape.salePrice)],
          nonNullable: false,
        }
      ),
      observations: this.fb.control('', 
        {
          validators: [zodValidator(registrySaleStockFormSchema.shape.observations)],
          nonNullable: false,
        }
      ),
      documentNumber: this.fb.control('', 
        {
          validators : [zodValidator(registrySaleStockFormSchema.shape.documentNumber)],
          nonNullable: false,
        }
      ),
      dateSale: this.fb.control(this.functionDateService.formatDateToYYYYMMDD(this.today), 
        {
          validators: [zodValidator(registrySaleStockFormSchema.shape.dateSale)],
          nonNullable: false,
        }
      )
    })
  }


  protected getFormValue(){

    console.log(this.recordOuputInventoryForm.getRawValue());
    
  }

}
