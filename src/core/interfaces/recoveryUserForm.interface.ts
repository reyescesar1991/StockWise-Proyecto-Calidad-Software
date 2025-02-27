import { FormControl } from "@angular/forms";

export interface IRecoveryUserForm{

    idUser : FormControl<string | null>;
    securityCode : FormControl<string | null>;
}