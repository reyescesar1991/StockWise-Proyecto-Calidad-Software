import { FormControl } from "@angular/forms";

export interface IAdjustProductStockForm{

    nameProduct : FormControl<string | null>;
    actualStock: FormControl<number | null>;
    adjustmentType: FormControl<string | null>;
    adjustmentReason: FormControl<string | null>;
    adjustmentDetails: FormControl<string | null>;
    dateAdjust: FormControl<Date | null>;
    adjustedBy: FormControl<string | null>;
}