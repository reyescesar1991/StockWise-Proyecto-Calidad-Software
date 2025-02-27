import {z} from 'zod'

export const registryUserFormSchema = z.object({


    idUser : z.string()
    .regex(/^(?=(?:[^\d]*\d){4})(?=(?:[^a-zA-Z]*[a-zA-Z]){4}).{8}$/, {message: 'Código de registro con formato erroneo'})
    .min(8, {message: 'El código de usuario debe tener al menos 8 caracteres'}),

    name : z.string().regex(/^[a-zA-Z\s]+$/, {message: 'Nombre con formato erroneo, no se permiten caracteres númericos ni especiales'}),

    lastName : z.string().regex(/^[a-zA-Z\s]+$/, {message: 'Nombre con formato erroneo, no se permiten caracteres númericos ni especiales'}),

    rol: z.string(),

    password : z.string().min(8, {message : 'La contraseña no cumple con el mínimo de caracteres (mínimo 8)'})
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{12,}$/,{message: "La contraseña debe tener al menos 12 caracteres y contener al menos una mayúscula, una minúscula, un número y un carácter especial."}),

    email : z.string().email({message : 'Formato de email incorrecto'}),

    codeCountry : z.string(),

    phoneNumber : z.string().regex(/^(0412|0416|0424|0414)\d{7}$/ , {message: 'Formato de telefono erroneo'}),

    headquarters : z.string(),
})

export type RegistryUserFormSchema = z.infer<typeof registryUserFormSchema>;