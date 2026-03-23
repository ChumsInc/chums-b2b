import type {InvoiceHistoryHeader} from "chums-types/b2b";
import {InvoiceLink} from "@/components/invoices/InvoiceLink.tsx";
import DateString from "@/components/common/DateString.tsx";
import numeral from "numeral";
import Decimal from "decimal.js";
import type {VirtuoColumn} from "@/types/generic.ts";

export const invoiceFields: VirtuoColumn<InvoiceHistoryHeader>[] = [
    {
        field: 'InvoiceNo',
        title: 'Invoice #',
        // width: 120,
        render: (invoice) => <InvoiceLink invoice={invoice}/>,
        sortable: true
    },
    {
        field: 'InvoiceDate',
        title: 'Invoice Date',
        // width: 120,
        render: (so) => <DateString date={so.InvoiceDate}/>, sortable: true
    },
    {
        field: 'SalesOrderNo', title: 'Order #',
        // render: (row) => <OrderLink salesOrderNo={row.SalesOrderNo} orderType="past"/>,
        sortable: true
    },
    {field: 'CustomerPONo', title: 'PO #', sortable: true},
    {field: 'OrderDate', title: 'Order Date', render: (so) => <DateString date={so.OrderDate}/>, sortable: true},
    {
        field: 'ShipToName', title: 'Ship To', className: 'hidden-xs', sortable: true, render: (row) => (
            <span>{!!row.ShipToCode && (<span>[{row.ShipToCode}]</span>)} {row.ShipToName}</span>
        )
    },
    {
        field: 'ShipToCity', title: 'Location', className: 'hidden-xs',
        render: (so) => `${so.ShipToCity ?? ''}, ${so.ShipToState ?? ''} ${so.ShipToZipCode ?? ''}`,
        sortable: true
    },
    {
        field: 'NonTaxableSalesAmt',
        title: 'Total',
        render: (so) => numeral(new Decimal(so.NonTaxableSalesAmt ?? 0).add(so.TaxableSalesAmt ?? 0).sub(so.DiscountAmt ?? 0)).format('($0,0.00)'),
        align: 'right',
        sortable: true
    },
    {
        field: 'Balance', title: 'Due', className: 'right',
        render: row => numeral(row.Balance).format('($0,0.00)'),
        sortable: true,
        align: 'right',
    },
    {
        field: 'InvoiceDueDate', title: 'Due Date', render: (so) => <DateString
            date={so.InvoiceDueDate}/>, sortable: true
    },
];
