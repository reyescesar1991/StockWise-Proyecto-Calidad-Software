import { FormControl } from "@angular/forms";

export interface IRecoveryPasswordForm{

    username : FormControl<string | null>;
    idUser : FormControl<string | null>;
    securityCode: FormControl<string | null>;

}