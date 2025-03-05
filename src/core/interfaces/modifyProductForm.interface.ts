import { FormControl } from "@angular/forms";

export interface IModifyProductForm{

    nameProduct: FormControl<string | null>;
    description: FormControl<string | null>;
    productCode: FormControl<string | null>;
    category: FormControl<string | null>;
    costPrice: FormControl<number | null>;
    sellingPrice: FormControl<number | null>;
    unit: FormControl<string | null>;
    minStock: FormControl<number | null>;
    productImage: FormControl<File | null>;
    productStatus: FormControl<string | null>;
    statusReason: FormControl<string | null>;
}