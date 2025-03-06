import { FormControl } from "@angular/forms";

export interface IRegistrySaleStockForm{

    outflowType : FormControl<string | null>;
    product : FormControl<string | null>;
    quantitySale: FormControl<number | null>;
    mermaReason: FormControl<string | null>;
    salePrice: FormControl<number | null>;
    observations: FormControl<string | null>;
    mermaDetails: FormControl<string | null>;
    dateSale: FormControl<Date | null>;
    documentNumber: FormControl<string | null>;
}