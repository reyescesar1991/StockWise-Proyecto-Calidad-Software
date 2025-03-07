import { FormControl } from "@angular/forms";

export interface IAdjustProductStockForm{

    nameProduct : FormControl<string | null>;
    actualStock: FormControl<number | null>;
    adjustmentReason: FormControl<string | null>;
    adjustmentDetails: FormControl<string | null>;
    dateAdjust: FormControl<string | null>;
    adjustedBy: FormControl<string | null>;
}