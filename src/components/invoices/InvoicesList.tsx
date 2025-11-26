

import {type ChangeEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {
    selectFilteredInvoicesList,
    selectInvoicesListLimit,
    selectInvoicesListLimitReached,
    selectInvoicesListOffset,
    selectInvoicesLoaded, selectInvoicesShowPaid,
    selectInvoicesSort,
    selectInvoicesStatus,
    setInvoicesSort
} from "@/ducks/invoices/invoiceListSlice";
import {loadInvoices} from "@/ducks/invoices/actions";
import {InvoiceLink} from "./InvoiceLink";
import DateString from "@/components/common/DateString.tsx";
import numeral from "numeral";
import DataTable, {type SortableTableField} from "@/components/common/DataTable";
import type {InvoiceHistoryHeader} from "chums-types/b2b";
import Decimal from "decimal.js";
import type {SortProps} from "@/types/generic";
import LinearProgress from "@mui/material/LinearProgress";
import TablePagination from "@mui/material/TablePagination";
import {invoiceKey} from "@/ducks/invoices/utils";
import localStore from "@/utils/LocalStore";
import {STORE_INVOICES_ROWS_PER_PAGE, STORE_INVOICES_SORT} from "@/constants/stores";
import Button from "@mui/material/Button";
import InvoiceListFilter from "./InvoiceListFilter";
import Box from "@mui/material/Box";
import {ErrorBoundary} from "react-error-boundary";
import Alert from "@mui/material/Alert";
import {canStorePreferences} from "@/ducks/cookie-consent/utils";
import {selectCustomerAccount} from "@/ducks/customer/currentCustomerSlice";
import {customerKey} from "@/ducks/customer/utils";
import {selectCurrentInvoiceNo} from "@/ducks/invoices/currentInvoiceSlice";
import NoOpenInvoicesAlert from "@/components/invoices/NoOpenInvoicesAlert";


const invoiceFields: SortableTableField<InvoiceHistoryHeader>[] = [
    {
        field: 'InvoiceNo', title: 'Invoice #',
        render: (invoice) => <InvoiceLink invoice={invoice}/>, sortable: true
    },
    {
        field: 'InvoiceDate', title: 'Invoice Date',
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

const InvoicesList = () => {
    const dispatch = useAppDispatch();
    const list = useAppSelector(selectFilteredInvoicesList);
    const limit = useAppSelector(selectInvoicesListLimit);
    const limitReached = useAppSelector(selectInvoicesListLimitReached);
    const offset = useAppSelector(selectInvoicesListOffset);
    const invoiceNo = useAppSelector(selectCurrentInvoiceNo);
    const loaded = useAppSelector(selectInvoicesLoaded);
    const status = useAppSelector(selectInvoicesStatus);
    const showPaidInvoices = useAppSelector(selectInvoicesShowPaid);
    const currentCustomer = useAppSelector(selectCustomerAccount);
    const sort = useAppSelector(selectInvoicesSort);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(localStore.getItem<number>(STORE_INVOICES_ROWS_PER_PAGE, 10) ?? 10);

    useEffect(() => {
        if (status === 'idle' && !loaded && !!currentCustomer) {
            dispatch(loadInvoices({key: customerKey(currentCustomer), start: 0, limit}))
            setPage(0);
        }
    }, [currentCustomer, status, loaded]);

    useEffect(() => {
        setPage(0);
    }, [sort]);

    const rowsPerPageChangeHandler = (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const rpp = +(ev.target.value ?? 10);
        if (canStorePreferences()) {
            localStore.setItem(STORE_INVOICES_ROWS_PER_PAGE, rpp);
        }
        setRowsPerPage(rpp);
    }

    const reloadHandler = () => {
        if (!currentCustomer) {
            return;
        }
        dispatch(loadInvoices({key: currentCustomer, start: 0, limit: 500}));
        setPage(0);
    }

    const loadMoreHandler = () => {
        if (!currentCustomer || limitReached) {
            return;
        }
        dispatch(loadInvoices({key: currentCustomer, start: offset + limit, limit}));
    }

    if (!currentCustomer || !currentCustomer.CustomerNo) {
        return null;
    }

    const sortChangeHandler = (arg: SortProps<InvoiceHistoryHeader>) => {
        if (canStorePreferences()) {
            localStore.setItem<SortProps<InvoiceHistoryHeader>>(STORE_INVOICES_SORT, arg);
        }
        dispatch(setInvoicesSort(arg));
    }

    return (
        <ErrorBoundary fallback={undefined}
                       FallbackComponent={() => <Alert severity="error">Sorry, an error occurred</Alert>}>
            <Box>
                <InvoiceListFilter onReload={reloadHandler}/>
                {status === 'loading' && <LinearProgress variant="indeterminate" sx={{mb: 1}}/>}
                {loaded && !showPaidInvoices && list.length === 0 && (
                    <NoOpenInvoicesAlert />
                )}
                <DataTable<InvoiceHistoryHeader> keyField={row => invoiceKey(row)}
                                                 data={list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                                                 selected={invoiceNo}
                                                 fields={invoiceFields} currentSort={sort}
                                                 onChangeSort={sortChangeHandler}/>
                <Box display="flex" justifyContent="flex-end">
                    <TablePagination component="div"
                                     count={list.length} page={page} onPageChange={(_, arg) => setPage(arg)}
                                     rowsPerPage={rowsPerPage} onRowsPerPageChange={rowsPerPageChangeHandler}
                                     showFirstButton showLastButton/>
                    <Button type="button" variant="text" onClick={loadMoreHandler}
                            disabled={limitReached || status !== 'idle'}>
                        Load More
                    </Button>
                </Box>
            </Box>
        </ErrorBoundary>
    );
}

export default InvoicesList;
