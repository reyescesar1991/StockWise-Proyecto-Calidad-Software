import {z} from 'zod';

const today = new Date();

export const registrySaleStockFormSchema = z.object({

    outflowType : z.string().nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),
    nameProduct : z.string().nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),
    quantitySale: z.number().gte(1, {message: 'El mínimo a vender es 1'}).nullable().refine(value => value !== null, {
        message: "Tipo de dato requerido",
    }),
    mermaReason: z
    .preprocess(
      val => val === "" ? undefined : val, 
      z.string().optional()
    ),
    salePrice: z.number().gte(0.11, {message: 'Valor de venta no permitido'}).nullable().refine(value => value !== null, {
        message: "Tipo de dato requerido",
    }),
    observations: z.string().min(5 , {message: 'Observación no puede tener menos de 5 caracteres'}).optional(),
    mermaDetails: z
    .preprocess(
      val => val === "" ? undefined : val,
      z.string().optional()
    ),
    dateSale: z.string().nullable(),
    documentNumber: z.string().nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),

});

export type RegistrySaleStockFormSchema = z.infer<typeof registrySaleStockFormSchema>;