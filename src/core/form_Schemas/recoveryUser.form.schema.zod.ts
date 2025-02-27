import {z} from 'zod';

export const recoveryUserFormSchema = z.object({

    idUser : z.string()
    .regex(/^(?=(?:[^\d]*\d){4})(?=(?:[^a-zA-Z]*[a-zA-Z]){4}).{8}$/, {message: 'Código de registro con formato erroneo'})
    .min(8, {message: 'El código de usuario debe tener al menos 8 caracteres'}),

    securityCode : z.string(),
})

export type recoveryUserFormSchema = z.infer<typeof recoveryUserFormSchema>;

export type IdUser = z.infer<typeof recoveryUserFormSchema.shape.idUser>;
export type securityCode = z.infer<typeof recoveryUserFormSchema.shape.securityCode>;