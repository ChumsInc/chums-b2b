import type {OrderType} from "../types/salesorder";
import type {KeyedObject} from "../types/generic";


export interface OrderTypeList {
    cart: OrderType
    open: OrderType
    past: OrderType
    master: OrderType
    invoice: OrderType
}

export const ORDER_TYPE: OrderTypeList = {
    cart: 'cart',
    open: 'open',
    past: 'past',
    master: 'master',
    invoice: 'invoice',
};

export const PRICE_LEVELS: KeyedObject<string> = {
    1: 'Wholesale 100 Pc',
    2: 'Wholesale 200 Pc',
    5: 'Wholesale 500 Pc',
    A: 'Distributor 5000 Pc',
    B: 'Distributor 10000 Pc',
    C: 'Distributor 20000 Pc',
    N: 'Safety DNS',
    S: 'Safety DSS',
    M: 'Safety DSM',
    L: 'Safety DSL',
    G: 'Safety GOV',
    X: 'International 5000',
    Y: 'International 10000',
    Z: 'International 20000',
};
