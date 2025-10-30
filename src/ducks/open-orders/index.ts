import {createReducer} from "@reduxjs/toolkit";
import {isCancelledSalesOrder, isEditableSalesOrder} from "../sales-order/utils";
import type {EmailResponse, SalesOrderHeader} from "b2b-types";
import {
    closeEmailResponse,
    loadOpenOrders,
    loadSalesOrder,
    sendOrderEmail,
    setCartsFilter,
    setOpenOrdersFilter,
    setSalesOrderSort,
    updateDetailLine
} from "./actions";
import {loadCustomer, setCustomerAccount} from "../customer/actions";
import {customerSlug} from "@/utils/customer";
import {setLoggedIn, setUserAccess} from "../user/actions";
import type {LoadStatus, SortProps} from "@/types/generic";
import type {ActionStatusList, OpenOrderDetailList, OpenOrderList} from "./types";
import {dismissContextAlert} from "../alerts/actions";

export interface OpenOrdersState {
    customerKey: string | null;
    list: OpenOrderList;
    loading: 'idle' | 'pending' | 'rejected' | 'saving' | 'deleting';
    loaded: boolean;
    sort: SortProps<SalesOrderHeader>;
    cartsFilter: string;
    openFilter: string;
    actionStatus: ActionStatusList;
    sendEmail: {
        status: LoadStatus | 'fulfilled';
        response: EmailResponse | null;
        error: string | null;
    }
}

export const initialOpenOrderState = (): OpenOrdersState => ({
    customerKey: null,
    list: {},
    loading: 'idle',
    loaded: false,
    sort: {field: 'SalesOrderNo', ascending: true},
    cartsFilter: '',
    openFilter: '',
    actionStatus: {},
    sendEmail: {
        status: 'idle',
        response: null,
        error: null,
    },
})

const openOrdersReducer = createReducer(initialOpenOrderState(), (builder) => {
    builder
        .addCase(loadCustomer.pending, (state, action) => {
            const key = customerSlug(action.meta.arg);
            if (state.customerKey !== key) {
                state.customerKey = key;
                state.list = {};
                state.loaded = false;
                state.openFilter = '';
                state.cartsFilter = '';
            }
        })
        .addCase(setCustomerAccount.pending, (state, action) => {
            const key = customerSlug(action.meta.arg);
            if (state.customerKey !== key) {
                state.list = {};
                state.loaded = false;
                state.customerKey = key;
                state.openFilter = '';
                state.cartsFilter = '';
            }
        })
        .addCase(loadOpenOrders.pending, (state) => {
            state.loading = 'pending';
        })
        .addCase(loadOpenOrders.fulfilled, (state, action) => {
            state.loading = 'idle';
            state.loaded = true;
            state.list = {};
            action.payload.map(so => {
                if (!state.actionStatus[so.SalesOrderNo]) {
                    state.actionStatus[so.SalesOrderNo] = 'idle';
                }
                state.list[so.SalesOrderNo] = so;
            })
        })
        .addCase(loadOpenOrders.rejected, (state) => {
            state.loading = 'rejected';
        })
        .addCase(setLoggedIn, (state, action) => {
            if (!action.payload?.loggedIn) {
                state.list = {};
                state.loaded = false;
                state.customerKey = null;
                state.actionStatus = {};
            }
        })
        .addCase(setUserAccess.pending, (state, action) => {
            if (!action.meta.arg?.isRepAccount && state.customerKey !== customerSlug(action.meta.arg)) {
                state.list = {};
                state.loaded = false;
                state.customerKey = customerSlug(action.meta.arg);
            }
        })
        .addCase(loadSalesOrder.pending, (state, action) => {
            state.actionStatus[action.meta.arg] = 'pending';
        })
        .addCase(loadSalesOrder.fulfilled, (state, action) => {
            state.actionStatus[action.meta.arg] = 'idle';
            if (action.payload && !isCancelledSalesOrder(action.payload)) {
                const key = action.payload.SalesOrderNo;
                const detail: OpenOrderDetailList = {};
                action.payload.detail.forEach(line => {
                    detail[line.LineKey] = line;
                })
                state.list[key] = {
                    ...action.payload,
                    detail,
                }
            }
        })
        .addCase(loadSalesOrder.rejected, (state, action) => {
            state.actionStatus[action.meta.arg] = 'rejected';
        })
        .addCase(setCartsFilter, (state, action) => {
            state.cartsFilter = action.payload;
        })
        .addCase(setOpenOrdersFilter, (state, action) => {
            state.openFilter = action.payload;
        })
        .addCase(setSalesOrderSort, (state, action) => {
            state.sort = action.payload;
        })
        .addCase(updateDetailLine, (state, action) => {
            const {SalesOrderNo, LineKey, ...props} = action.payload;
            const so = state.list[SalesOrderNo];
            if (so && isEditableSalesOrder(so)) {
                if (so.detail[LineKey]) {
                    so.detail[LineKey] = {...so.detail[LineKey], ...props, changed: true};
                }
            }
        })
        .addCase(sendOrderEmail.pending, (state) => {
            state.sendEmail.status = 'pending';
            state.sendEmail.response = null;
            state.sendEmail.error = null;
        })
        .addCase(sendOrderEmail.fulfilled, (state, action) => {
            state.sendEmail.response = action.payload;
            state.sendEmail.status = 'fulfilled';
        })
        .addCase(sendOrderEmail.rejected, (state, action) => {
            state.sendEmail.status = 'idle';
            state.sendEmail.response = null;
            state.sendEmail.error = action?.error?.message ?? null;
        })
        .addCase(closeEmailResponse, (state) => {
            state.sendEmail.status = 'idle';
            state.sendEmail.response = null;
            state.sendEmail.error = null;
        })
        .addCase(dismissContextAlert, (state, action) => {
            switch (action.payload) {
                case loadOpenOrders.typePrefix:
                    state.loading = 'idle';
                    return;
            }
        })
})
export default openOrdersReducer;
