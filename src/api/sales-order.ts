import type {SalesOrder} from 'chums-types/b2b'
import {fetchJSON} from "./fetch";
import type {LoadSalesOrderProps, LoadSalesOrdersProps} from "@/types/salesorder";
import debug from "@/utils/debug.ts";


export async function fetchSalesOrder({customerKey, salesOrderNo}: LoadSalesOrderProps): Promise<SalesOrder | null> {
    try {
        const url = '/api/sales/b2b/account/:customerKey/orders/open/:salesOrderNo.json'
            .replace(':customerKey', encodeURIComponent(customerKey))
            .replace(':salesOrderNo', encodeURIComponent(salesOrderNo));
        const response = await fetchJSON<{ salesOrder: SalesOrder }>(url, {cache: 'no-cache'});
        return response?.salesOrder ?? null;
    } catch (err) {
        if (err instanceof Error) {
            debug("fetchSalesOrder()", err.message);
            return Promise.reject(err);
        }
        debug("fetchSalesOrder()", err);
        return Promise.reject(new Error('Error in fetchSalesOrder()'));
    }

}

export async function fetchOpenSalesOrders({customerKey}: LoadSalesOrdersProps): Promise<SalesOrder[]> {
    try {
        const url = '/api/sales/b2b/account/:customerKey/orders/open.json'
            .replace(':customerKey', encodeURIComponent(customerKey));
        const res = await fetchJSON<{ list: SalesOrder[] }>(url, {cache: 'no-cache'});
        return res?.list ?? [];
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("fetchOpenSalesOrders()", err.message);
            return Promise.reject(err);
        }
        debug("fetchOpenSalesOrders()", err);
        return Promise.reject(new Error('Error in fetchOpenSalesOrders()'));
    }
}


