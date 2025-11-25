import type {BasicCustomer} from "chums-types/b2b";
import {generatePath} from "react-router";
import {customerSlug} from "./customer";


export const genInvoicePath = (customer: BasicCustomer, invoiceNo: string, invoiceType?: string) => {
    return generatePath(`/account/:customerSlug/invoices/:invoiceType/:invoiceNo`, {
        customerSlug: customerSlug(customer),
        invoiceType: invoiceType ?? 'IN',
        invoiceNo: invoiceNo,
    })
};

export const customerUserPath = '/account/:customerSlug/users/:id?';
