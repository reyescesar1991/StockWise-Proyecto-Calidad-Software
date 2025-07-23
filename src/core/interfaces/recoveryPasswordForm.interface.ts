import { FormControl } from "@angular/forms";

export interface IRecoveryPasswordForm{

    idUser : FormControl<string | null>;
    password: FormControl<string | null>;
    confirmPassword: FormControl<string | null>;

}