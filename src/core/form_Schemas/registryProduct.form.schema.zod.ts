import {z} from 'zod';

export const registryProductFormSchema = z.object({

    name: z.string(),
    description: z.string().min(5, {message: 'La descripción debe tener al menos 5 caracteres'}),
    category: z.string(),
    unit: z.string(),
    sellingPrice: z.number().gte(0.11, {message: 'El valor de venta mínimo de un producto no puede ser menor a 0.11 $'}).nullable(),
    costPrice: z.number().gte(0.1, {message: 'El valor de costo mínimo de un producto no puede ser menor a 0.1 $'}).nullable(),
    initialStock: z.number().gte(5, {message : 'El valor mínimo de registro inicial en el stock no puede ser menor de 5 unidades'}).nullable(),
    minStock: z.number().gte(10, {message: 'El valor mínimo de aviso de stock bajo para los productos no puede ser menor a 10 unidades'}).nullable(),
    productImage: z.any().refine(file => file instanceof File, {
        message: "Debe ser un archivo válido"
    }).optional()
});



export type RegistryProductFormSchema = z.infer<typeof registryProductFormSchema>;