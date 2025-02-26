import { z } from 'zod'

export const recoveryPasswordFormSchema = z.object({

    username: z.string()
    .max(50, {message: 'Nombre de usuario excede el limite permitido'})
    .min(10, {message: 'Nombre de usuario no tiene el minimo de caracteres permitidos'}),

    idUser: z.string()
    .regex(/^(?=(?:[^\d]*\d){4})(?=(?:[^a-zA-Z]*[a-zA-Z]){4}).{8}$/, {message: 'Código de registro con formato erroneo'})
    .min(8, {message: 'El código de usuario debe tener al menos 8 caracteres'}),

    securityCode: z.string()
});


export type recoveryPasswordFormSchema = z.infer<typeof recoveryPasswordFormSchema>;

export type UserNameSchema = recoveryPasswordFormSchema['username'];
export type IdUserSchema = recoveryPasswordFormSchema['idUser'];
export type SecurityCode = recoveryPasswordFormSchema['securityCode'];