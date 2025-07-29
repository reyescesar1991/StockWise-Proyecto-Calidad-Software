import {z} from 'zod'

export const registryUserFormSchema = z.object({


    idUser : z.string().refine((value) => {

        const regex = /^[a-zA-Z]{4}\d{4}$/;
        return regex.test(value);

    }, "Formato de ID de usuario incorrecto, debe iniciar con 4 carácteres y seguido tener 4 números"),

    name : z.string().regex(/^[a-zA-Z\s]+$/, {message: 'Nombre con formato erroneo, no se permiten caracteres númericos ni especiales'}),

    username : z.string().min(6, "El usuario debe tener al menos 6 carácteres"),

    lastName : z.string().regex(/^[a-zA-Z\s]+$/, {message: 'Nombre con formato erroneo, no se permiten caracteres númericos ni especiales'}),

    rol: z.string(),

    password : z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{12,}$/, { message: "La contraseña debe tener al menos 12 caracteres y contener al menos una mayúscula, una minúscula, un número y un carácter especial." }),

    email : z.string().email({message : 'Formato de email incorrecto'}),

    codeCountry : z.string(),

    phoneNumber : z.string().regex(/^(0412|0416|0424|0414)\d{7}$/, { message: 'Formato de telefono erroneo' }),

    headquarters : z.string(),

    secondFactorAuth : z.string(),

    department : z.string(),
})

export type RegistryUserFormSchema = z.infer<typeof registryUserFormSchema>;