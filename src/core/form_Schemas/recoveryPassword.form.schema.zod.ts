import { z } from 'zod'

export const recoveryPasswordFormSchemaBase = z.object({

    username: z.string()
    .max(50, {message: 'Nombre de usuario excede el limite permitido'})
    .min(10, {message: 'Nombre de usuario no tiene el minimo de caracteres permitidos'}),

    idUser: z.string()
    .regex(/^(?=(?:[^\d]*\d){4})(?=(?:[^a-zA-Z]*[a-zA-Z]){4}).{8}$/, {message: 'Código de registro con formato erroneo'})
    .min(8, {message: 'El código de usuario debe tener al menos 8 caracteres'}),

    securityCode: z.string(),

    password: z.string()
    .min(8, {message : 'La contraseña no cumple con el mínimo de caracteres (mínimo 8)'})
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{12,}$/,{message: "La contraseña debe tener al menos 12 caracteres y contener al menos una mayúscula, una minúscula, un número y un carácter especial."}),

    confirmPassword: z.string(),

});

export const recoveryPasswordFormSchema = recoveryPasswordFormSchemaBase.refine((data) => data.password === data.confirmPassword, { // Usamos recoveryPasswordFormSchemaBase para refine
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});


export type recoveryPasswordFormSchema = z.infer<typeof recoveryPasswordFormSchema>;
export type UserNameSchema = z.infer<typeof recoveryPasswordFormSchemaBase.shape.username>; // Usamos recoveryPasswordFormSchemaBase.shape
export type IdUserSchema = z.infer<typeof recoveryPasswordFormSchemaBase.shape.idUser>; // Usamos recoveryPasswordFormSchemaBase.shape
export type SecurityCode = z.infer<typeof recoveryPasswordFormSchemaBase.shape.securityCode>; // Usamos recoveryPasswordFormSchemaBase.shape
export type ConfirmPassword = z.infer<typeof recoveryPasswordFormSchemaBase.shape.confirmPassword>; // Usamos recoveryPasswordFormSchemaBase.shape
export type Password = z.infer<typeof recoveryPasswordFormSchemaBase.shape.password>; // Usamos recoveryPasswordFormSchemaBase.shape