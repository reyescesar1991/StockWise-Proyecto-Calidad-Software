import { FormControl } from "@angular/forms";
import { IPermissionsModel, ISecurityPermissionsModel } from "../models";

export interface IUpdateUserForm{

    idUser : FormControl<string | null>;
    email : FormControl<string | null>;
    nameUser : FormControl<string | null>;
    lastNameUser : FormControl<string | null>;
    address : FormControl<string | null>;
    phoneNumber : FormControl<string | null>;
    codeCountry : FormControl<string | null>;
    rol : FormControl<string | null>;
    headquarters : FormControl<string | null>;
    department : FormControl<string | null>;
    position : FormControl<string | null>;
    hireDate : FormControl<string | null>;
    permissions: FormControl<IPermissionsModel[] | null>;
    permissionsSecurity : FormControl<ISecurityPermissionsModel[] | null>
}