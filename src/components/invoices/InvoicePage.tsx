

import {useEffect} from 'react';
import {loadInvoice} from '@/ducks/invoices/actions';
import InvoiceHeader from "./InvoiceHeader";
import InvoicePageDetail from "./InvoicePageDetail";
import DocumentTitle from "../DocumentTitle";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {redirect, useMatch} from "react-router";
import {selectCurrentInvoice, selectCurrentInvoiceStatus} from "@/ducks/invoices/currentInvoiceSlice";
import {billToCustomerSlug} from "@/utils/customer";
import LinearProgress from "@mui/material/LinearProgress";
import type {InvoiceType} from "chums-types/b2b";
import type {FetchInvoiceArg} from "@/ducks/invoices/types";
import Typography from "@mui/material/Typography";
import {selectCustomerKey} from "@/ducks/customer/currentCustomerSlice";

const invoiceTypeDescription = (invoiceType: InvoiceType): string => {
    switch (invoiceType) {
        case 'CM':
            return 'Credit Memo';
        case 'DM':
            return 'Debit Memo';
        case 'AD':
            return 'Adjustment';
        case 'FC':
            return 'Finance Charge';
        case 'CA':
            return 'Cash Invoice';
        case 'XD':
            return 'Deleted Invoice';
            // no default
    }
    return 'Invoice';
}

const InvoicePage = () => {
    const dispatch = useAppDispatch();
    const match = useMatch('/account/:customerSlug/invoices/:invoiceType/:invoiceNo');
    const invoice = useAppSelector(selectCurrentInvoice);
    const status = useAppSelector(selectCurrentInvoiceStatus);
    const customer = useAppSelector(selectCustomerKey);

    useEffect(() => {
        if (customer && billToCustomerSlug(customer) !== match?.params?.customerSlug) {
            redirect('/profile');
            return;
        }
        if (status === 'idle'
            && !!match?.params.invoiceNo && !!match.params.invoiceType
            && (!invoice || match.params?.invoiceNo !== invoice.InvoiceNo)) {
            const arg: FetchInvoiceArg = {
                InvoiceNo: match.params.invoiceNo,
                InvoiceType: match.params.invoiceType as InvoiceType
            };
            dispatch(loadInvoice(arg));
        }
    }, [match, invoice, status, customer]);

    const documentTitle = `Invoice: ${match?.params?.invoiceNo ?? ''}-${match?.params?.invoiceType ?? ''}`;

    return (
        <div className="sales-order-page">
            <DocumentTitle documentTitle={documentTitle}/>
            <Typography component="h2" variant="h2">{documentTitle}</Typography>
            {!!invoice && invoice.InvoiceType !== 'IN' && (
                <Typography component="h3" variant="h3">{invoiceTypeDescription(invoice.InvoiceType)}</Typography>)}
            {status === 'loading' && <LinearProgress variant="indeterminate"/>}
            <InvoiceHeader/>
            <InvoicePageDetail/>
        </div>

    )
}
export default InvoicePage;
