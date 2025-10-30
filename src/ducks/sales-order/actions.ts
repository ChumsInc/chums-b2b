import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import type {EmailResponse, SalesOrder, SalesOrderHeader} from "b2b-types";
import {fetchSalesOrder, postOrderEmail} from "@/api/sales-order";
import type {SortProps} from "@/types/generic";
import {type RootState} from "@/app/configureStore";
import {selectLoggedIn} from "../user/selectors";
import {selectSalesOrderHeader, selectSalesOrderProcessing, selectSendEmailStatus, selectSOLoading} from "./selectors";
import type {DetailLineChangeProps} from "@/types/salesorder";
import {billToCustomerSlug} from "@/utils/customer";
import {selectCustomerKey} from "@/ducks/customer/selectors";

export const loadSalesOrder = createAsyncThunk<SalesOrder | null, string, { state: RootState }>(
    'salesOrder/load',
    async (arg, {getState}) => {
        const state = getState();
        const customer = selectCustomerKey(state)!;
        const customerKey = billToCustomerSlug(customer)!;
        return await fetchSalesOrder({customerKey, salesOrderNo: arg});
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            const customer = selectCustomerKey(state);
            return !!arg && !!customer && selectSalesOrderProcessing(state) === 'idle' && !selectSOLoading(state);
        }
    }
)

export const setShipToFilter = createAction<string>('orders/filters/setShipToCode');
export const setPOFilter = createAction<string>('orders/filters/setCustomerPONo');
export const setSort = createAction<SortProps<SalesOrderHeader>>('orders/setSort');
export const setPage = createAction<number>('orders/setPage');
export const setRowsPerPage = createAction<number>('orders/setRowsPerPage');

export const sendOrderEmail = createAsyncThunk<EmailResponse | null, SalesOrderHeader, { state: RootState }>(
    'salesOrder/sendEmail',
    async (arg) => {
        return await postOrderEmail(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectLoggedIn(state)
                && !!arg
                && selectSendEmailStatus(state) === 'idle'
                && !!selectSalesOrderHeader(state);
        }
    }
)

export const closeEmailResponse = createAction('orders/sendEmail/confirmed');

export const updateDetailLine = createAction<DetailLineChangeProps>('salesOrder/detail/update');
