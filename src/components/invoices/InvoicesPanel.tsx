import InvoicesTable from "@/components/invoices/InvoicesTable.tsx";
import ErrorBoundary from "@/components/common/ErrorBoundary.tsx";
import InvoiceListFilter from "@/components/invoices/InvoiceListFilter.tsx";
import Box from "@mui/material/Box";
import useCustomer from "@/hooks/customer/useCustomer.ts";
import {loadInvoices} from "@/ducks/invoices/actions.ts";
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {toCustomerKey} from "@/ducks/customer/utils.ts";
import {
    selectInvoicesListLimit,
    selectInvoicesListLimitReached,
    selectInvoicesListOffset,
    selectInvoicesStatus
} from "@/ducks/invoices/invoiceListSlice.ts";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import {useEffect} from "react";

export default function InvoicesPanel() {
    const dispatch = useAppDispatch();
    const {customer, shipTo} = useCustomer();
    const limit = useAppSelector(selectInvoicesListLimit);
    const limitReached = useAppSelector(selectInvoicesListLimitReached);
    const offset = useAppSelector(selectInvoicesListOffset);
    const status = useAppSelector(selectInvoicesStatus);

    useEffect(() => {
        if (customer) {
            dispatch(loadInvoices({key: toCustomerKey({...customer, ShipToCode: shipTo?.ShipToCode}), start: 0, limit: 500}));
        }
    }, [dispatch, customer, shipTo]);


    const reloadHandler = () => {
        if (!customer) {
            return;
        }
        dispatch(loadInvoices({key: toCustomerKey({...customer, ShipToCode: shipTo?.ShipToCode}), start: 0, limit: 500}));
    }
    const loadMoreHandler = () => {
        if (!customer || limitReached) {
            return;
        }
        dispatch(loadInvoices({key: toCustomerKey({...customer, ShipToCode: shipTo?.ShipToCode}), start: offset + limit, limit}));
    }

    return (
        <ErrorBoundary>
            <Box>
                <InvoiceListFilter onReload={reloadHandler}/>
                {status === 'loading' && <LinearProgress variant="indeterminate" sx={{mb: 1}}/>}
                <InvoicesTable/>
                <Box display="flex" justifyContent="flex-end">
                    <Button type="button" variant="text" onClick={loadMoreHandler}
                            disabled={limitReached || status !== 'idle'}>
                        Load More
                    </Button>
                </Box>
            </Box>
        </ErrorBoundary>
    )
}
