import type {CustomerKey, EmailResponse, SalesOrder} from 'chums-types/b2b'
import {fetchJSON} from "./fetch.js";
import type {ApplyPromoCodeBody} from "@/types/cart";
import type {LoadSalesOrderProps, LoadSalesOrdersProps} from "@/types/salesorder";
import {shortCustomerKey} from "@/utils/customer.js";


export async function fetchSalesOrder({customerKey, salesOrderNo}: LoadSalesOrderProps): Promise<SalesOrder | null> {
    try {
        const url = '/api/sales/b2b/account/:customerKey/orders/open/:salesOrderNo.json'
            .replace(':customerKey', encodeURIComponent(customerKey))
            .replace(':salesOrderNo', encodeURIComponent(salesOrderNo));
        const response = await fetchJSON<{ salesOrder: SalesOrder }>(url, {cache: 'no-cache'});
        return response?.salesOrder ?? null;
    } catch (err) {
        if (err instanceof Error) {
            console.debug("fetchSalesOrder()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchSalesOrder()", err);
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
            console.debug("fetchOpenSalesOrders()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchOpenSalesOrders()", err);
        return Promise.reject(new Error('Error in fetchOpenSalesOrders()'));
    }
}


export async function postOrderEmail({ARDivisionNo, CustomerNo, SalesOrderNo}: {
    ARDivisionNo: string;
    CustomerNo: string;
    SalesOrderNo: string;
}): Promise<EmailResponse | null> {
    try {
        const url = '/node-sage/api/CHI/salesorder/:ARDivisionNo-:CustomerNo/:SalesOrderNo/email'
            .replace(':ARDivisionNo', encodeURIComponent(ARDivisionNo))
            .replace(':CustomerNo', encodeURIComponent(CustomerNo))
            .replace(':SalesOrderNo', encodeURIComponent(SalesOrderNo));
        const res = await fetchJSON<{ result: EmailResponse }>(url, {method: 'post'});
        return res?.result ?? null;
    } catch (err) {
        if (err instanceof Error) {
            console.debug("postOrderEmail()", err.message);
            return Promise.reject(err);
        }
        console.debug("postOrderEmail()", err);
        return Promise.reject(new Error('Error in postOrderEmail()'));
    }
}

export async function postApplyPromoCode(customer: CustomerKey, body: ApplyPromoCodeBody): Promise<SalesOrder | null> {
    try {
        const params = new URLSearchParams();
        params.set('co', 'chums');
        params.set('account', `${customer.ARDivisionNo}-${customer.CustomerNo}`);
        const url = `/sage/b2b/cart-quote.php?${params.toString()}`
        await fetchJSON(url, {body: JSON.stringify(body), method: 'POST'});
        const soArg: LoadSalesOrderProps = {
            customerKey: shortCustomerKey(customer),
            salesOrderNo: body.SalesOrderNo,
        }
        return await fetchSalesOrder(soArg)
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("postApplyPromoCode()", err.message);
            return Promise.reject(err);
        }
        console.debug("postApplyPromoCode()", err);
        return Promise.reject(new Error('Error in postApplyPromoCode()'));
    }
}




