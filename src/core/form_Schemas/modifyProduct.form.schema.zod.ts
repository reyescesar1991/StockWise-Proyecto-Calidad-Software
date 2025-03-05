import {z} from 'zod';

export const  modifyProductFormSchema = z.object({

    nameProduct : z.string(),
    description: z.string().min(5, {message: 'La descripción debe tener al menos 5 caracteres'}),
    productCode: z.string().readonly(),
    category: z.string(),
    sellingPrice: z.number().gte(0.10, {message: 'El valor de venta mínimo de un producto no puede ser menor a 0.11 $'}).nullable(),
    costPrice: z.number().gte(0.1, {message: 'El valor de costo mínimo de un producto no puede ser menor a 0.1 $'}).nullable(),
    unit: z.string(),
    minStock: z.number().gte(10, {message: 'El valor mínimo de aviso de stock bajo para los productos no puede ser menor a 10 unidades'}).nullable(),
    productImage: z.any().refine(file => file instanceof File, {
        message: "Debe ser un archivo válido"
    }).optional(),
    productStatus: z.string(),
    statusReason: z.string().min(3, {message: 'Debe colocar una razón valida'}),
});

export type ModifyProductFormSchema = z.infer<typeof modifyProductFormSchema>;