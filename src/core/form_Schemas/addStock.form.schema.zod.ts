import {z} from 'zod';

export const addStockFormSchema = z.object({

    productName: z.string().nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),
    quantityReceived: z.number().gte(1, {message: 'La cantidad mínima a registrar es 1'}).nullable().refine(value => value !== null, {
        message: "Tipo de dato requerido",
    }),
    receptionDate: z.string(),
    supplier: z.string().nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),
    batchNumber: z.string().regex(/^LOT-(202[5-9]|20[3-9]\d|2[1-9]\d{2}|[3-9]\d{3})-\d{3}$/, {message: 'Formato de lote incorrecto, debe tener el siguiente formato: LOT-2025-123'}).nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),
    notes: z.string().min(5, {message: 'La descripción de la operación debe tener al menos 5 caracteres'}).nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),
});


export type AddStockFormSchema = z.infer<typeof addStockFormSchema>;