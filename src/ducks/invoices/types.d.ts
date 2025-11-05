import type {CustomerKey, InvoiceHistoryHeader} from "chums-types/b2b";
export type FetchInvoiceArg = Pick<InvoiceHistoryHeader, 'InvoiceNo' | 'InvoiceType'>;
export interface LoadInvoicesProps {
    key: CustomerKey | null;
    start?: number;
    limit?: number;
}
