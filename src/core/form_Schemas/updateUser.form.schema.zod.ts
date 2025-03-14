import { z } from 'zod';

export const updateUserFormSchema = z.object({

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

    address: z.string().min(10, { message: 'Debe colocar una dirección valida' }).nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),

    phoneNumber: z.string().regex(/^(0412|0416|0424|0414)\d{7}$/, { message: 'Formato de telefono erroneo' })
        .nullable()
        .refine(value => value && value.trim().length > 0, {
            message: "Tipo de dato requerido",
        }),

    codeCountry: z.string().nullable().refine(value => value && value.trim().length > 0, {
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

    position: z.string().nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),

    hireDate: z.string().nullable(),

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
        .optional(),

    permissionsSecurity: z.array(

        z.object({
            label: z.string(),
            can: z.boolean(),
            permission: z.string(),
            id: z.string(),
        }).refine(perm =>
            perm.label &&
            perm.permission &&
            perm.id &&
            typeof perm.can === 'boolean', {
            message: 'Estructura de permiso de seguridad invalida'
        }
        )
    )
        .nullable()
        .optional(),


//Codigo para hacer que al menos un permiso sea seleccionado
        // .refine(value => {

        //     if (value === null) return true;
        //     return value.some(perm => perm.can === true);
        // },

});

export type UpdateUserFormSchema = z.infer<typeof updateUserFormSchema>;