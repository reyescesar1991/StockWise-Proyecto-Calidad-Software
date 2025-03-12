import { z } from 'zod';

export const addUserFormSchema = z.object({

    idUser: z.string()
        .regex(/^(?=(?:[^\d]*\d){4})(?=(?:[^a-zA-Z]*[a-zA-Z]){4}).{8}$/, { message: 'Código de registro con formato erroneo' })
        .min(8, { message: 'El código de usuario debe tener al menos 8 caracteres' }).nullable().refine(value => value && value.trim().length > 0, {
            message: "Tipo de dato requerido",
        }),

    email: z.string().email({ message: 'Formato de correo electrónico no valido' }).nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),

    nameUser: z.string().nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),

    lastNameUser: z.string().nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),

    password: z.string()
        .min(8, { message: 'La contraseña no cumple con el mínimo de caracteres (mínimo 8)' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{12,}$/, { message: "La contraseña debe tener al menos 12 caracteres y contener al menos una mayúscula, una minúscula, un número y un carácter especial." })
        .nullable()
        .refine(value => value && value.trim().length > 0, {
            message: "Tipo de dato requerido",
        }),

    confirmPassword: z.string().nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),

    codeCountry : z.string().nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),

    phoneNumber: z.string().regex(/^(0412|0416|0424|0414)\d{7}$/, { message: 'Formato de telefono erroneo' })
        .nullable()
        .refine(value => value && value.trim().length > 0, {
            message: "Tipo de dato requerido",
        }),

    address: z.string().min(10, { message: 'Debe colocar una dirección valida' }).nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),

    rol: z.string().nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),

    headquarters: z.string().nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),

    department: z.string().nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),

    job: z.string().nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),

    permissions: z.array(
        z.object({
            label: z.string(),
            permission: z.string(),
            can: z.boolean()
        }).refine(perm =>
            perm.label &&
            perm.permission &&
            typeof perm.can === 'boolean', {
            message: "Estructura de permiso inválida"
        })
    )
        .nullable()
        .refine(value => {
            // Validación personalizada si necesitas al menos un permiso activo
            if (value === null) return true; // Permitir null si es opcional
            return value.some(perm => perm.can === true); // Al menos un permiso activo
        }, {
            message: "Debe seleccionar al menos un permiso"
    }),

    notes: z.string().min(5, { message: 'El usuario debe tener una nota inicial' }).nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    })

});

export type AddUserFormSchema = z.infer<typeof addUserFormSchema>;