import {z} from 'zod';

export const  modifyProductFormSchema = z.object({

    nameProduct : z.string().nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),
    description: z.string().min(5, {message: 'La descripción debe tener al menos 5 caracteres'}).nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),
    productCode: z.string().readonly(),
    category: z.string().nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),
    sellingPrice: z.number().gte(0.11, {message: 'El valor de venta mínimo de un producto no puede ser menor a 0.11 $'}).nullable().refine(value => value !== null, {
        message: "Tipo de dato requerido",
    }),
    costPrice: z.number().gte(0.1, {message: 'El valor de costo mínimo de un producto no puede ser menor a 0.1 $'}).nullable().refine(value => value !== null, {
        message: "Tipo de dato requerido",
    }),
    unit: z.string().nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),
    minStock: z.number().gte(10, {message: 'El valor mínimo de aviso de stock bajo para los productos no puede ser menor a 10 unidades'}).nullable().refine(value => value !== null, {
        message: "Tipo de dato requerido",
    }),
    productImage: z
        .instanceof(File, { message: "Debe ser un archivo válido" })
        .nullable()
        .optional()
        .refine(file => {
            // Solo validar si existe un archivo
            if (file) {
                return file instanceof File;
            }
            return true; // Permitir valor ausente
        }, { message: "Archivo inválido" }),
    productStatus: z.string().nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),
    statusReason: z.string().min(3, {message: 'Debe colocar una razón valida'}).nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),
});

export type ModifyProductFormSchema = z.infer<typeof modifyProductFormSchema>;