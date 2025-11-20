import {isValidCustomer} from "@/utils/customer";
import {createAsyncThunk} from "@reduxjs/toolkit";
import type {ExtendedInvoice, InvoiceHistoryHeader} from "chums-types/b2b";
import type {FetchInvoiceArg, LoadInvoicesProps} from "./types";
import {fetchInvoice, fetchInvoices} from "@/api/invoices.js";
import {type RootState} from "@/app/configureStore.js";
import {selectLoggedIn} from "../user/userProfileSlice.js";
import {selectInvoicesStatus} from "@/ducks/invoices/invoiceListSlice.js";
import {selectCurrentInvoiceStatus} from "@/ducks/invoices/currentInvoiceSlice.js";


export const loadInvoice = createAsyncThunk<ExtendedInvoice | null, FetchInvoiceArg, { state: RootState }>(
    'invoices/loadInvoice',
    async (arg) => {
        return await fetchInvoice(arg);
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectCurrentInvoiceStatus(state) === 'idle';
        }
    }
)


export const loadInvoices = createAsyncThunk<InvoiceHistoryHeader[], LoadInvoicesProps, { state: RootState }>(
    'invoices/loadInvoices',
    async (arg) => {
        return await fetchInvoices(arg);
    }, {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectLoggedIn(state) && !!arg && selectInvoicesStatus(state) === 'idle' && isValidCustomer(arg.key);
        }
    }
)

