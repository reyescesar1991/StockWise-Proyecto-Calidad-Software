import { FormControl } from "@angular/forms";

export interface IRegistryProductForm{

    name : FormControl<string | null>;
    description: FormControl<string | null>;
    category: FormControl<string | null>;
    unit: FormControl<string | null>;
    sellingPrice: FormControl<number | null>;
    costPrice: FormControl<number | null>;
    initialStock: FormControl<number | null>;
    minStock: FormControl<number | null>;
    productImage: FormControl<File | null>;
}