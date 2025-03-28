import {isValidCustomer} from "@/utils/customer";
import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {STORE_INVOICES_ROWS_PER_PAGE, STORE_INVOICES_SORT} from "@/constants/stores";
import localStore from "../../utils/LocalStore";
import {fetchInvoice, fetchInvoices} from "@/api/invoices";
import {selectCurrentInvoiceLoading, selectInvoicesLoading} from "./selectors";
import {RootState} from "@/app/configureStore";
import {ExtendedInvoice, InvoiceHistoryHeader} from "b2b-types";
import {selectLoggedIn} from "../user/selectors";
import {FetchInvoiceArg, LoadInvoicesProps} from "./types";
import {SortProps} from "@/types/generic";


export const setInvoicesPage = createAction('invoices/setPage');
export const setInvoicesRowsPerPage = createAction('invoices/setRowsPerPage', (rowsPerPage) => {
    localStore.setItem(STORE_INVOICES_ROWS_PER_PAGE, rowsPerPage);
    return {
        payload: rowsPerPage
    }
});


export const loadInvoice = createAsyncThunk<ExtendedInvoice | null, FetchInvoiceArg, {state: RootState}>(
    'invoices/loadInvoice',
    async (arg) => {
        return await fetchInvoice(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !selectCurrentInvoiceLoading(state);
        }
    }
)


export const loadInvoices = createAsyncThunk<InvoiceHistoryHeader[], LoadInvoicesProps, {state: RootState}>(
    'invoices/loadInvoices',
    async (arg) => {
        return await fetchInvoices(arg);
    }, {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectLoggedIn(state) && !!arg && !selectInvoicesLoading(state) && isValidCustomer(arg.key);
        }
    }
)

export const setShowPaidInvoices = createAction<boolean | undefined>('invoices/filter/setShowPaidInvoices');
export const setInvoicesFilterShipToCode = createAction<string | null>('invoices/filter/setShipToCode');
export const setInvoicesFilterSearch = createAction<string>('invoices/filter/setSearch');
export const setInvoicesSort = createAction('invoices/setSort', (arg: SortProps<InvoiceHistoryHeader>) => {
    localStore.setItem<SortProps<InvoiceHistoryHeader>>(STORE_INVOICES_SORT, arg);
    return {
        payload: arg
    };
});
