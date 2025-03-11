import {z} from 'zod';

const today = new Date();

export const registrySaleStockFormSchema = z.object({

    outflowType : z.string(),
    nameProduct : z.string(),
    quantitySale: z.number().gte(1, {message: 'El mínimo a vender es 1'}).nullable(),
    mermaReason: z.string().optional(),
    salePrice: z.number().gte(0.11, {message: 'Valor de venta no permitido'}).nullable().refine(value => value !== null, { //  <- Añadimos .refine() para el error de "requerido"
        message: "Tipo de dato requerido", // <- Mensaje personalizado para "requerido"
    }),
    observations: z.string().min(5 , {message: 'Observación no puede tener menos de 5 caracteres'}).optional(),
    mermaDetails: z.string().min(5, {message: 'Detalle de la merma no puede tener menos de 5 caracteres'}).optional(),
    dateSale: z.string(),
    documentNumber: z.string(),

});

export type RegistrySaleStockFormSchema = z.infer<typeof registrySaleStockFormSchema>;