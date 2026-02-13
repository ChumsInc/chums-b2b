export type OrderType = 'cart' | 'open' | 'past' | 'master' | 'invoice';

export interface LoadSalesOrdersProps {
    customerKey: string;
}

export interface LoadSalesOrderProps extends LoadSalesOrdersProps {
    salesOrderNo: string;
}
