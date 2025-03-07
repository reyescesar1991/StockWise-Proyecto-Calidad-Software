import { FormControl } from "@angular/forms";

export interface IRegistryStockForm{

    nameProduct: FormControl<string | null>;
    quantityReceived: FormControl<number | null>;
    receptionDate: FormControl<string | null>;
    supplier: FormControl<string | null>;
    batchNumber: FormControl<string | null>;
    notes: FormControl<string | null>;
}