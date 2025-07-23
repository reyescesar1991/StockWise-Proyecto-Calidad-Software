import { FormControl, FormGroup } from "@angular/forms";

export interface ILoginForm {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
}

export type ICredentials = FormGroup<ILoginForm>['value'];

/**
 * Interfaz para la estructura del objeto 'data' en la respuesta del login.
 */
export interface ILoginResponse {
  token: string;
  // Aquí puedes añadir más propiedades que devuelva tu API dentro de 'data',
  // como información del usuario, roles, etc.
}

/**
 * Interfaz para la estructura del objeto 'data' en la respuesta del login con factor de autenticacion.
 */
export interface ILogin2faResponse {
  userId: string;
  preAuthToken : string;

}

/**
 * Interfaz para la estructura del objeto request para el segundo factor.
 */
export interface IVerify2FA {
  userId: string;
  code : string;
}

/**
 * Interfaz para la estructura del objeto request para el paso final de recuperar contraseña.
 */
export interface IRequestConfirmRecoveryPassword {
  idUser: string;
  newPassword : string;
}
