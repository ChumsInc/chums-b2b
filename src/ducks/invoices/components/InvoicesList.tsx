import React, {useEffect, useState} from 'react';
import {useAppDispatch} from "@/app/configureStore";
import {useSelector} from "react-redux";
import {selectCurrentCustomer} from "../../user/selectors";
import {selectCurrentInvoice, selectCurrentInvoiceNo, selectInvoicesList, selectInvoicesLoading} from "../selectors";
import {loadInvoices} from "../actions";
import {InvoiceLink} from "@/ducks/invoices/components/InvoiceLink";
import {DateString} from "@/components/DateString";
import OrderLink from "@/components/OrderLink";
import numeral from "numeral";
import {SortableTableField} from "@/common-components/DataTable";
import {InvoiceHeader} from "b2b-types";
import Decimal from "decimal.js";
import {SortProps} from "@/types/generic";
import LinearProgress from "@mui/material/LinearProgress";
import OrderFilter from "@/components/OrderFilter";
import SortableTable from "@/common-components/SortableTable";
import TablePagination from "@mui/material/TablePagination";
import {invoicesSorter} from "@/ducks/invoices/utils";


const invoiceFields: SortableTableField<InvoiceHeader>[] = [
    {
        field: 'InvoiceNo', title: 'Invoice #',
        render: (so) => <InvoiceLink invoice={so}/>, sortable: true
    },
    {
        field: 'InvoiceDate', title: 'Invoice Date',
        render: (so) => <DateString date={so.InvoiceDate}/>, sortable: true
    },
    {
        field: 'SalesOrderNo', title: 'Order #',
        render: (so) => <OrderLink salesOrderNo={so.SalesOrderNo} orderType="past"/>,
        sortable: true
    },
    {field: 'CustomerPONo', title: 'PO #', sortable: true},
    {field: 'OrderDate', title: 'Order Date', render: (so) => <DateString date={so.OrderDate}/>, sortable: true},
    {field: 'ShipToName', title: 'Ship To', className: 'hidden-xs', sortable: true},
    {
        field: 'ShipToCity', title: 'Location', className: 'hidden-xs',
        render: (so) => `${so.ShipToCity ?? ''}, ${so.ShipToState ?? ''} ${so.ShipToZipCode ?? ''}`,
        sortable: true
    },
    {
        field: 'NonTaxableSalesAmt',
        title: 'Total',
        render: (so) => numeral(new Decimal(so.NonTaxableSalesAmt ?? 0).add(so.TaxableSalesAmt ?? 0).sub(so.DiscountAmt ?? 0)).format('($0,0.00)'),
        className: 'right',
        sortable: true
    },
    {
        field: 'Balance', title: 'Due', className: 'right',
        render: row => numeral(row.Balance).format('($0,0.00)'),
        sortable: true,

    },
    {
        field: 'InvoiceDueDate', title: 'Due Date', render: (so) => <DateString
            date={so.InvoiceDueDate}/>, sortable: true
    },
];

const InvoicesList = () => {
    const dispatch = useAppDispatch();
    const list = useSelector(selectInvoicesList);
    const invoiceNo = useSelector(selectCurrentInvoiceNo);
    const loading = useSelector(selectInvoicesLoading);
    const currentCustomer = useSelector(selectCurrentCustomer);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sort, setSort] = useState<SortProps<InvoiceHeader>>({field: 'InvoiceDate', ascending: false});
    const [search, setSearch] = useState('');
    const [data, setData] = useState<InvoiceHeader[]>([]);

    useEffect(() => {
        const data = list
            .filter(so => {
                return !search.trim()
                    || so.InvoiceNo.includes(search.trim().toUpperCase())
                    || so.CustomerPONo?.toUpperCase()?.includes(search.trim().toUpperCase())
            })
            .sort(invoicesSorter(sort));
        setData(data);
    }, [list, search, sort]);

    const reloadHandler = () => {
        if (!currentCustomer) {
            return;
        }
        dispatch(loadInvoices(currentCustomer));
    }

    if (!currentCustomer || !currentCustomer.CustomerNo) {
        return null;
    }
    const sortChangeHandler = (sort: SortProps) => setSort(sort);
    return (
        <div>
            {loading && <LinearProgress variant="indeterminate" sx={{mb: 1}}/>}
            <OrderFilter value={search} onChange={(ev) => setSearch(ev.target.value)} placeholder="Invoice or PO#">
                <div className="col-auto">
                    <button type="button" className="btn btn-sm btn-outline-primary" onClick={reloadHandler}>
                        Reload
                    </button>
                </div>
            </OrderFilter>
            <SortableTable keyField="InvoiceNo"
                           data={data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                           selected={invoiceNo}
                           fields={invoiceFields} currentSort={sort} onChangeSort={sortChangeHandler}/>
            <TablePagination component="div"
                             count={data.length} page={page} rowsPerPage={rowsPerPage}
                             onPageChange={(ev, page) => setPage(page)} showFirstButton
                             showLastButton/>
        </div>
    );
}

export default InvoicesList;
