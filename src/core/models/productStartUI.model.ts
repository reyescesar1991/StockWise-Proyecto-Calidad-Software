import { ProductBase } from "../types/productsTypes";

export interface IProductStartUI extends ProductBase{

    status: 'warning' | 'error';
}