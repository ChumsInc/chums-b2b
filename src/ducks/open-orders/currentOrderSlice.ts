import {createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import type {SalesOrderDetailLine, SalesOrderHeader} from "chums-types/b2b";
import {loadOpenOrders, loadSalesOrder} from "@/ducks/open-orders/actions";
import {setLoggedIn, setUserAccess} from "@/ducks/user/actions";
import {customerSlug} from "@/utils/customer";
import {loadCustomer, setCustomerAccount} from "@/ducks/customer/actions";
import {detailSequenceSorter} from "@/ducks/sales-order/utils";
import {dismissContextAlert} from "@/ducks/alerts/alertsSlice";

const adapter = createEntityAdapter<SalesOrderDetailLine, string>({
    selectId: (arg) => arg.LineKey,
    sortComparer: (a, b) => a.LineKey.localeCompare(b.LineKey),
})

const selectors = adapter.getSelectors();

export interface CurrentOrderState {
    customerKey: string | null;
    salesOrderNo: string | null;
    header: SalesOrderHeader | null;
    invoices: string[];
    status: 'idle' | 'loading' | 'rejected';
}

const extraState: CurrentOrderState = {
    customerKey: null,
    salesOrderNo: null,
    header: null,
    invoices: [],
    status: 'idle',
};

const currentOrderSlice = createSlice({
    name: 'openOrder',
    initialState: adapter.getInitialState(extraState),
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadSalesOrder.pending, (state, action) => {
                state.status = 'loading';
                if (action.meta.arg !== state.salesOrderNo) {
                    adapter.removeAll(state);
                    state.salesOrderNo = action.meta.arg;
                    state.header = null;
                    state.invoices = [];
                }
            })
            .addCase(loadSalesOrder.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    const {detail, invoices, ...rest} = action.payload;
                    state.header = rest;
                }
                state.invoices = action.payload?.invoices ?? [];
                adapter.setAll(state, action.payload?.detail ?? []);
            })
            .addCase(loadSalesOrder.rejected, (state) => {
                state.status = 'rejected';
                adapter.removeAll(state);
            })
            .addCase(dismissContextAlert, (state, action) => {
                if (action.payload?.startsWith(loadSalesOrder.typePrefix)) {
                    state.status = 'idle';
                }
            })
            .addCase(setLoggedIn, (state, action) => {
                if (!action.payload.loggedIn) {
                    adapter.removeAll(state)
                    state.customerKey = null;
                    state.salesOrderNo = null;
                    state.header = null;
                    state.invoices = [];
                }
            })
            .addCase(setUserAccess.pending, (state, action) => {
                const customerKey = customerSlug(action?.meta?.arg);
                if (!action.meta.arg?.isRepAccount && state.customerKey !== customerKey) {
                    adapter.removeAll(state)
                    state.customerKey = customerKey;
                    state.salesOrderNo = null;
                    state.header = null;
                    state.invoices = [];
                }
            })
            .addCase(setCustomerAccount.fulfilled, (state, action) => {
                const customerKey = customerSlug(action.payload.customer);
                if (state.customerKey !== customerKey) {
                    adapter.removeAll(state)
                    state.customerKey = customerKey;
                    state.salesOrderNo = null;
                    state.header = null;
                    state.invoices = [];
                }
            })
            .addCase(loadCustomer.pending, (state, action) => {
                const customerKey = customerSlug(action.meta.arg);
                if (state.customerKey !== customerKey) {
                    adapter.removeAll(state)
                    state.customerKey = customerKey;
                    state.salesOrderNo = null;
                    state.header = null;
                    state.invoices = [];
                }
            })
            .addCase(loadOpenOrders.fulfilled, (state, action) => {
                const salesOrder = action.payload.find(so => so.SalesOrderNo === state.salesOrderNo);
                state.header = salesOrder ?? null;
                if (!salesOrder) {
                    adapter.removeAll(state);
                    state.invoices = [];
                    state.salesOrderNo = null;
                }
            })
    },
    selectors: {
        selectAll: (state) => selectors.selectAll(state),
        selectSalesOrderHeader: (state) => state.header,
        selectInvoices: (state) => state.invoices,
        selectSalesOrderStatus: (state) => state.status,
    }
})

export default currentOrderSlice;
export const {
    selectAll,
    selectInvoices,
    selectSalesOrderHeader,
    selectSalesOrderStatus
} = currentOrderSlice.selectors;

export const selectSalesOrderDetail = createSelector(
    [selectAll],
    (detail) => {
        return [...detail].sort(detailSequenceSorter);
    }
)

export const selectSalesOrderInvoices = createSelector(
    [selectInvoices],
    (invoices) => {
        return [...invoices].sort();
    }
)


