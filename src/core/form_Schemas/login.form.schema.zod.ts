// core/form_Schemas.ts
import { z } from 'zod';

export const loginFormSchema = z.object({
    username: z.string()
        .max(50, {message: 'Nombre de usuario excede el limite permitido'})
        .min(6, {message: 'Nombre de usuario no tiene el minimo de caracteres permitidos'})
        ,

    password: z.string()
        .max(50, {message: 'Ha superado el limite de caracteres para la contraseña'})
        .min(8, {message: 'La contraseña debe tener al menos 8 caracteres'})
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{12,}$/, { message: "La contraseña debe tener al menos 12 caracteres y contener al menos una mayúscula, una minúscula, un número y un carácter especial." }),
});

// Exportamos el tipo del schema
export type LoginFormSchema = z.infer<typeof loginFormSchema>;
// Exportamos los tipos individuales
export type UsernameSchema = LoginFormSchema['username'];
export type PasswordSchema = LoginFormSchema['password'];