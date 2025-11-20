import {
    createEntityAdapter,
    createSelector,
    createSlice,
    type PayloadAction,
    type WritableDraft,
} from "@reduxjs/toolkit";
import Decimal from "decimal.js";
import type {InvoiceHistoryHeader, SortProps} from "chums-types/b2b";
import {defaultInvoicesSort, invoiceKey, invoicesSorter} from "@/ducks/invoices/utils.js";
import localStore from "@/utils/LocalStore.js";
import {STORE_INVOICES_SORT} from "@/constants/stores.js";
import {setLoggedIn, setUserAccess} from "@/ducks/user/actions.js";
import {customerSlug} from "@/utils/customer.js";
import {loadCustomer, setCustomerAccount} from "@/ducks/customer/actions.js";
import {loadInvoice, loadInvoices} from "@/ducks/invoices/actions.js";
import {dismissContextAlert} from "@/ducks/alerts/alertsSlice.js";
import {selectPermittedBillToAddress} from "@/ducks/customer/selectors.js";
import {selectPermittedShipToAddresses} from "@/ducks/customer/customerShipToAddressSlice.js";

const adapter = createEntityAdapter<InvoiceHistoryHeader, string>({
    selectId: (arg) => invoiceKey(arg),
    sortComparer: (a, b) => invoiceKey(a).localeCompare(invoiceKey(b))
})

const selectors = adapter.getSelectors();

export interface InvoiceListState {
    customerKey: string | null;
    status: 'idle' | 'loading' | 'rejected';
    loaded: boolean;
    offset: number;
    limit: number;
    limitReached: boolean;
    filters: {
        showPaidInvoices: boolean;
        shipToCode: string | null;
        search: string;
    }
    sort: SortProps<InvoiceHistoryHeader>
}

const extraState = (): InvoiceListState => {
    return {
        customerKey: null,
        status: 'idle',
        loaded: false,
        offset: 0,
        limit: 500,
        limitReached: false,
        filters: {
            showPaidInvoices: false,
            shipToCode: null,
            search: '',
        },
        sort: localStore.getItem<SortProps<InvoiceHistoryHeader>>(STORE_INVOICES_SORT, defaultInvoicesSort),
    }
}

export const getInvoiceListInitialState = () => {
    return adapter.getInitialState(extraState());
}


const invoiceListSlice = createSlice({
    name: 'invoicesList',
    initialState: adapter.getInitialState(extraState()),
    reducers: {
        setInvoicesFilterSearch: (state, action: PayloadAction<string>) => {
            state.filters.search = action.payload;
        },
        setInvoicesFilterShipToCode: (state, action: PayloadAction<string | null>) => {
            state.filters.shipToCode = action.payload;
        },
        setShowPaidInvoices: (state, action: PayloadAction<boolean | null>) => {
            state.filters.showPaidInvoices = action.payload ?? !state.filters.showPaidInvoices;
        },
        setInvoicesSort: (state, action: PayloadAction<SortProps<InvoiceHistoryHeader>>) => {
            state.sort = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(setLoggedIn, (state, action) => {
                if (!action.payload.loggedIn) {
                    resetCustomerInvoices(state, null);
                }
            })
            .addCase(setUserAccess.pending, (state, action) => {
                const customerKey = customerSlug(action?.meta?.arg);
                if (!action.meta.arg?.isRepAccount && state.customerKey !== customerKey) {
                    resetCustomerInvoices(state, customerKey);
                }
            })
            .addCase(loadCustomer.pending, (state, action) => {
                const customerKey = customerSlug(action.meta.arg);
                if (state.customerKey !== customerKey) {
                    resetCustomerInvoices(state, customerKey);
                }
            })
            .addCase(setCustomerAccount.fulfilled, (state, action) => {
                const customerKey = customerSlug(action.payload.customer);
                if (state.customerKey !== customerKey) {
                    resetCustomerInvoices(state, customerKey);
                }
            })
            .addCase(loadInvoices.pending, (state, action) => {
                state.status = 'loading';
                const customerKey = customerSlug(action.meta.arg.key);
                if (state.customerKey !== customerKey) {
                    resetCustomerInvoices(state, customerKey);
                }
            })
            .addCase(loadInvoices.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loaded = true;
                if (action.meta.arg.start === 0) {
                    adapter.setAll(state, action.payload);
                } else {
                    adapter.setMany(state, action.payload);
                }
                state.limitReached = action.payload.length < state.limit;
                state.offset = action.meta.arg.start ?? 0;
            })
            .addCase(loadInvoices.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(dismissContextAlert, (state, action) => {
                if (action.payload?.startsWith(loadInvoices.pending.type)) {
                    state.status = 'idle';
                }
            })
            .addCase(loadInvoice.fulfilled, (state, action) => {
                if (action.payload) {
                    adapter.setOne(state, action.payload)
                }
            })
    },
    selectors: {
        selectAll: (state) => selectors.selectAll(state),
        selectInvoicesListLimit: (state) => state.limit,
        selectInvoicesListOffset: (state) => state.offset,
        selectInvoicesListLimitReached: (state) => state.limitReached,
        selectInvoicesShowPaid: (state) => state.filters.showPaidInvoices,
        selectInvoicesShipToFilter: (state) => state.filters.shipToCode,
        selectInvoicesSearch: (state) => state.filters.search,
        selectInvoicesSort: (state) => state.sort,
        selectInvoicesStatus: (state) => state.status,
        selectInvoicesLoaded: (state) => state.loaded,
    }
})

export default invoiceListSlice;

export const {
    setInvoicesFilterSearch,
    setInvoicesFilterShipToCode,
    setInvoicesSort,
    setShowPaidInvoices
} = invoiceListSlice.actions;
export const {
    selectAll,
    selectInvoicesListLimitReached,
    selectInvoicesListOffset,
    selectInvoicesSearch,
    selectInvoicesListLimit,
    selectInvoicesSort,
    selectInvoicesShowPaid,
    selectInvoicesShipToFilter,
    selectInvoicesStatus,
    selectInvoicesLoaded
} = invoiceListSlice.selectors;

export const selectFilteredInvoicesList = createSelector(
    [selectAll, selectInvoicesShowPaid, selectInvoicesShipToFilter,
        selectInvoicesSearch, selectInvoicesSort, selectPermittedBillToAddress, selectPermittedShipToAddresses],
    (list, showPaid, shipTo, search, sort, allowBillTo, allowedShipToList) => {
        return list
            .filter(inv => allowBillTo || allowedShipToList.map(c => c.ShipToCode).includes(inv.ShipToCode ?? ''))
            .filter(inv => showPaid || !new Decimal(inv.Balance ?? '0').eq(0))
            .filter(inv => !shipTo || inv.ShipToCode === shipTo)
            .filter(inv => !search
                || inv.CustomerPONo?.toLowerCase()?.includes(search.toLowerCase())
                || inv.InvoiceNo.toLowerCase().includes(search.toLowerCase())
                || inv.SalesOrderNo?.toLowerCase()?.includes(search.toLowerCase())
            )
            .sort(invoicesSorter(sort));
    }
)


function resetCustomerInvoices(state: WritableDraft<ReturnType<typeof invoiceListSlice.getInitialState>>,
                               customerKey: string | null) {
    adapter.removeAll(state);
    state.customerKey = customerKey;
    state.offset = 0;
    state.limitReached = false;
    state.filters.search = '';
    state.filters.shipToCode = null;
    state.filters.showPaidInvoices = false;
    state.loaded = false;
}
