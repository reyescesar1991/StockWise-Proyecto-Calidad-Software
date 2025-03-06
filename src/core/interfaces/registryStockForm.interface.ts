import { FormControl } from "@angular/forms";

export interface IRegistryStockForm{

    nameProduct: FormControl<string | null>;
    unitDisplay: FormControl<number | null>;
    receptionDate: FormControl<Date | null>;
    supplier: FormControl<string | null>;
    batchNumber: FormControl<string | null>;
    notes: FormControl<string | null>;
}