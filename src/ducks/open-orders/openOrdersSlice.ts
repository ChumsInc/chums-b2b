import {
    createEntityAdapter,
    createSelector,
    createSlice,
    type PayloadAction,
    type WritableDraft
} from "@reduxjs/toolkit";
import type {SalesOrderHeader, SortProps} from "chums-types/b2b";
import {setLoggedIn, setUserAccess} from "@/ducks/user/actions";
import {customerSlug} from "@/utils/customer";
import {loadCustomer, setCustomerAccount} from "@/ducks/customer/actions";
import {loadOpenOrders, loadSalesOrder} from "@/ducks/open-orders/actions";
import {dismissContextAlert} from "@/ducks/alerts/alertsSlice";
import {salesOrderSorter} from "@/ducks/sales-order/utils";

const adapter = createEntityAdapter<SalesOrderHeader, string>({
    selectId: (arg) => arg.SalesOrderNo,
    sortComparer: (a, b) => a.SalesOrderNo.localeCompare(b.SalesOrderNo),
})

const selectors = adapter.getSelectors();

export interface OpenOrdersState {
    customerKey: string | null;
    status: 'idle' | 'loading' | 'rejected';
    loaded: boolean;
    sort: SortProps<SalesOrderHeader>;
    filter: string;
}

const extraState: OpenOrdersState = {
    customerKey: null,
    status: 'idle',
    loaded: false,
    sort: {field: 'SalesOrderNo', ascending: true},
    filter: ''
};

const openOrdersSlice = createSlice({
    name: 'open-orders',
    initialState: adapter.getInitialState(extraState),
    reducers: {
        setSalesOrderSort: (state, action: PayloadAction<SortProps<SalesOrderHeader>>) => {
            state.sort = action.payload;
        },
        setOpenOrdersFilter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(setLoggedIn, (state, action) => {
                if (!action.payload.loggedIn) {
                    resetOrdersState(state)
                }
            })
            .addCase(setUserAccess.pending, (state, action) => {
                const customerKey = customerSlug(action?.meta?.arg);
                if (!action.meta.arg?.isRepAccount && state.customerKey !== customerKey) {
                    resetOrdersState(state, customerKey)
                }
            })
            .addCase(setCustomerAccount.fulfilled, (state, action) => {
                const customerKey = customerSlug(action.payload.customer);
                if (state.customerKey !== customerKey) {
                    resetOrdersState(state, customerKey)
                }
            })
            .addCase(loadCustomer.pending, (state, action) => {
                const customerKey = customerSlug(action.meta.arg);
                if (state.customerKey !== customerKey) {
                    resetOrdersState(state, customerKey);
                }
            })
            .addCase(loadOpenOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadOpenOrders.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loaded = true;
                adapter.setAll(state, action.payload)
            })
            .addCase(loadOpenOrders.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(dismissContextAlert, (state, action) => {
                if (action.payload.startsWith(loadOpenOrders.typePrefix)) {
                    state.status = 'idle';
                }
            })
            .addCase(loadSalesOrder.fulfilled, (state, action) => {
                if (action.payload) {
                    adapter.setOne(state, action.payload);
                }
            })
    },
    selectors: {
        selectOpenOrdersCustomerKey: (state) => state.customerKey,
        selectOpenOrders: (state) => selectors.selectAll(state),
        selectOpenOrdersStatus: (state) => state.status,
        selectOpenOrdersLoaded: (state) => state.loaded,
        selectOpenOrdersSort: (state) => state.sort,
        selectOpenOrdersFilter: (state) => state.filter,
        selectOpenOrdersLength: (state) => selectors.selectTotal(state),
        selectOpenOrderById: (state, id: string) => selectors.selectById(state, id) ?? null,
    }
})

export default openOrdersSlice;
export const {setSalesOrderSort, setOpenOrdersFilter} = openOrdersSlice.actions;
export const {
    selectOpenOrdersCustomerKey,
    selectOpenOrders,
    selectOpenOrdersStatus,
    selectOpenOrdersLoaded,
    selectOpenOrdersSort,
    selectOpenOrdersFilter,
    selectOpenOrdersLength,
    selectOpenOrderById,
} = openOrdersSlice.selectors;


export const selectOpenOrdersList = createSelector(
    [selectOpenOrders, selectOpenOrdersFilter, selectOpenOrdersSort],
    (list, filter, sort) => {
        return Object.values(list)
            .filter(so => so.OrderType !== 'Q' && so.OrderStatus !== 'C')
            .filter(so => !filter || so.SalesOrderNo.includes(filter) || so.CustomerPONo?.includes(filter))
            .sort(salesOrderSorter(sort));
    }
)

export const selectSalesOrder = selectOpenOrderById;


function resetOrdersState(state: WritableDraft<ReturnType<typeof openOrdersSlice.getInitialState>>, customerKey: string | null = null) {
    adapter.removeAll(state);
    state.loaded = false;
    state.filter = '';
    state.customerKey = customerKey;
}
