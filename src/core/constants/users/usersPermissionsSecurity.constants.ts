import { ISecurityPermissionsModel } from "../../models";

export const USER_PERMISSIONS_SECURITY : ISecurityPermissionsModel[] = [

    {
        label:'Forzar cambio de contraseña en próximo inicio de sesión',
        can : false,
        permission : 'forzar_cambio_contraseña',
        id : 'force_password_reset',
    },
    {
        label:'Autenticación de dos factores',
        can : false,
        permission : 'autenticacion_factor',
        id : 'two_factor_auth',
    },
    {
        label:'Bloquear cuenta temporalmente',
        can : false,
        permission : 'bloquear_cuenta_temporalmente',
        id : 'account_lock',
    },
]