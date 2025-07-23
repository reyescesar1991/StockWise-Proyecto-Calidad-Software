
/**
 * Interfaz para el custom id user del usuario.
 */
export interface ICustomIdUser {
  userId: string;
}


/**
 * Interfaz para la respuesta de la validacion de custom id user.
 */
export interface IValidateCustomIdUserResponse {
  userId: string;
  userExists : boolean;
}