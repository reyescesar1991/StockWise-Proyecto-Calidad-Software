import { Form, FormControl } from "@angular/forms";

export interface IRegistryUserForm {

    idUser : FormControl<string | null>;
    name : FormControl<string | null>;
    username : FormControl<string | null>;
    lastName : FormControl<string | null>;
    rol : FormControl<string | null>;
    password: FormControl<string | null>;
    email : FormControl<string | null>;
    codeCountry: FormControl<string | null>;
    phoneNumber: FormControl<string | null>;
    headquarters: FormControl<string | null>;
    department : FormControl<string | null>;
    secondFactorAuth : FormControl<string | null>;

}