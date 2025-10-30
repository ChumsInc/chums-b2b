import type {SalesOrderDetailLine} from "b2b-types";

export type OrderType = 'cart' | 'open' | 'past' | 'master' | 'invoice';

export interface DetailLineChangeProps extends Partial<SalesOrderDetailLine> {
    SalesOrderNo: string;
    LineKey: string;
}

export interface LoadSalesOrdersProps {
    customerKey: string;
}

export interface LoadSalesOrderProps extends LoadSalesOrdersProps {
    salesOrderNo: string;
}
