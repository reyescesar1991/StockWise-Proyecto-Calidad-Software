import { IProductModel } from "../../models";

export type ProductBase = Pick<IProductModel, 'name' | 'currentStock' | 'minStock'>;