export interface IProductModel{

    name: string,
    description: string,
    category: string,
    unit: string,
    sellingPrice: number,
    costPrice: number,
    initialStock: number,
    minStock: number,
    productImage: File,
    idProduct: string,
    status: string, //TODO: Agregar al form de registro
    location: string, //TODO: Agregar al form de registro
    optimalStock: string, //TODO: Agregar al form de registro
}