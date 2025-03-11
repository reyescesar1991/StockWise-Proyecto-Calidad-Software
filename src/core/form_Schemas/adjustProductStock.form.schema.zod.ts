import {z} from 'zod';

const today = new Date();

export const adjustProductStockFormSchema = z.object({

    productName : z.string().nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),
    actualStock: z.number().gte(1, {message: 'El nuevo stock no puede ser cero'}).nullable().nullable().refine(value => value !== null, {
        message: "Tipo de dato requerido",
    }),
    adjustmentReason: z.string().nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),
    adjustmentDetails: z.string().min(5, {message: 'La razón de ajuste debe ser mayor a cinco caracteres'}).nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),
    dateAdjust: z.string(),
    adjustedBy: z.string().nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),
});

export type AdjustProductStockFormSchema = z.infer<typeof adjustProductStockFormSchema>;