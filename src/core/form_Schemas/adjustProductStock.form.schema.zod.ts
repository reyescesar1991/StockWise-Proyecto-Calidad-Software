import {z} from 'zod';

const today = new Date();

export const adjustProductStockFormSchema = z.object({

    productName : z.string(),
    actualStock: z.number().gte(1, {message: 'El nuevo stock no puede ser cero'}).nullable(),
    adjustmentReason: z.string(),
    adjustmentDetails: z.string().min(5, {message: 'La razón de ajuste debe ser mayor a cinco caracteres'}),
    dateAdjust: z.string(),
    adjustedBy: z.string(),
});

export type AdjustProductStockFormSchema = z.infer<typeof adjustProductStockFormSchema>;