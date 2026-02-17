import {createAsyncThunk} from "@reduxjs/toolkit";
import type {SalesOrder} from "chums-types/b2b";
import {fetchOpenSalesOrders, fetchSalesOrder} from "@/api/sales-order";
import type {RootState} from "@/app/configureStore";
import {billToCustomerSlug} from "@/utils/customer";
import {selectCustomerKey} from "@/ducks/customer/currentCustomerSlice";
import {selectOpenOrdersStatus} from "@/ducks/open-orders/openOrdersSlice";
import {selectSalesOrderStatus} from "@/ducks/open-orders/currentOrderSlice";

export const loadOpenOrders = createAsyncThunk<SalesOrder[], string, { state: RootState }>(
    'open-orders/load',
    async (arg) => {

        return await fetchOpenSalesOrders({customerKey: arg});
    }, {
        condition: (arg, {getState}) => {
            const state = getState();
            return !!arg && selectOpenOrdersStatus(state) === 'idle';
        }
    }
)


export const loadSalesOrder = createAsyncThunk<SalesOrder | null, string, { state: RootState }>(
    'open-orders/loadSalesOrder',
    async (arg, {getState}) => {
        const state = getState();
        const customer = selectCustomerKey(state);
        const customerKey = billToCustomerSlug(customer)!;
        return await fetchSalesOrder({customerKey, salesOrderNo: arg});
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            const customer = selectCustomerKey(state);
            const actionStatus = selectSalesOrderStatus(state);
            return !!arg && !!customer && actionStatus === 'idle';
        }
    }
)
