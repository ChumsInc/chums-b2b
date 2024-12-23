import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {EmailResponse, SalesOrder, SalesOrderHeader} from "b2b-types";
import {fetchOpenSalesOrders, fetchSalesOrder, postOrderEmail} from "@api/sales-order";
import {RootState} from "@app/configureStore";
import {selectActionStatus, selectOpenOrdersLoading, selectSalesOrder, selectSendEmailStatus} from "./selectors";
import {SortProps} from "@typeDefs/generic";
import {DetailLineChangeProps} from "@typeDefs/salesorder";
import {selectCurrentCustomer, selectLoggedIn} from "../user/selectors";
import {billToCustomerSlug} from "@utils/customer";

export const loadOpenOrders = createAsyncThunk<SalesOrder[], string, { state: RootState }>(
    'open-orders/load',
    async (arg) => {

        return await fetchOpenSalesOrders({customerKey: arg});
    }, {
        condition: (arg, {getState}) => {
            const state = getState();
            return !!arg && selectOpenOrdersLoading(state) === 'idle';
        }
    }
)

export const setSalesOrderSort = createAction<SortProps<SalesOrderHeader>>('open-orders/setSort');
export const setOpenOrdersFilter = createAction<string>('open-orders/setOrdersFilter');
export const setCartsFilter = createAction<string>('open-orders/setCartsFilter');

export const updateDetailLine = createAction<DetailLineChangeProps>('open-orders/detail/update');

export const loadSalesOrder = createAsyncThunk<SalesOrder | null, string, { state: RootState }>(
    'open-orders/loadSalesOrder',
    async (arg, {getState}) => {
        const state = getState();
        const customer = selectCurrentCustomer(state)!;
        const customerKey = billToCustomerSlug(customer)!;
        return await fetchSalesOrder({customerKey, salesOrderNo: arg});
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            const customer = selectCurrentCustomer(state);
            const actionStatus = selectActionStatus(state);
            return !!arg && !!customer && (!actionStatus[arg] || actionStatus[arg] === 'idle');
        }
    }
)


export const sendOrderEmail = createAsyncThunk<EmailResponse | null, SalesOrderHeader, { state: RootState }>(
    'open-orders/sendEmail',
    async (arg) => {
        return await postOrderEmail(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectLoggedIn(state)
                && !!arg
                && selectSendEmailStatus(state) === 'idle'
                && !!selectSalesOrder(state, arg.SalesOrderNo);
        }
    }
)
export const closeEmailResponse = createAction('open-orders/sendEmail/confirmed');
