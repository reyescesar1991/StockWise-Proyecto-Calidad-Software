import { FormControl } from "@angular/forms";
import { IPermissionsModel } from "../models";

export interface IAddUserForm{

    idUser : FormControl<string | null>;
    email: FormControl<string | null>;
    nameUser: FormControl<string | null>;
    lastNameUser: FormControl<string | null>;
    password: FormControl<string | null>;
    confirmPassword: FormControl<string | null>;
    codeCountry : FormControl<string | null>;
    phoneNumber: FormControl<string | null>;
    address: FormControl<string | null>;
    rol: FormControl<string | null>;
    headquarters: FormControl<string | null>;
    department : FormControl<string | null>;
    job: FormControl<string | null>;
    permissions: FormControl<IPermissionsModel[] | null>;
    notes : FormControl<string | null>;
}