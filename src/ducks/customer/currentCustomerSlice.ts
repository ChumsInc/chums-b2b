import type {BillToCustomer} from "chums-types/b2b";
import {createSlice, type PayloadAction, type WritableDraft} from "@reduxjs/toolkit";
import {
    loadCustomer,
    saveBillingAddress,
    saveShipToAddress,
    setCustomerAccount,
    setDefaultShipTo
} from "@/ducks/customer/actions";
import {customerSlug, emptyCustomer} from "@/utils/customer";
import {setLoggedIn, setUserAccess} from "@/ducks/user/actions";
import {dismissContextAlert} from "@/ducks/alerts/alertsSlice";
import {loadCustomerList} from "@/ducks/customers/actions";

export interface CurrentCustomerState {
    customerKey: string | null;
    account: BillToCustomer | null;
    status: 'idle' | 'loading' | 'saving' | 'rejected';
    loaded: boolean;
    returnToPath: string | null;
}

const initialState: CurrentCustomerState = {
    customerKey: null,
    account: null,
    status: 'idle',
    loaded: false,
    returnToPath: null
};

const currentCustomerSlice = createSlice({
    name: 'currentCustomer',
    initialState: initialState,
    reducers: {
        setReturnToPath: (state, action: PayloadAction<string | null>) => {
            state.returnToPath = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(setCustomerAccount.fulfilled, (state, action) => {
                const customerKey = customerSlug(action.payload.customer);
                if (state.customerKey !== customerKey) {
                    state.customerKey = customerKey;
                }
                if (action.payload) {
                    state.account = {...emptyCustomer, ...action.payload.customer};
                }
            })
            .addCase(setLoggedIn, (state, action) => {
                if (!action.payload.loggedIn) {
                    resetCustomerState(state)
                }
            })
            .addCase(saveBillingAddress.pending, (state) => {
                state.status = 'saving';
            })
            .addCase(saveBillingAddress.fulfilled, (state, action) => {
                state.status = 'idle'
                state.account = action.payload?.customer ?? null;
                state.loaded = true;
            })
            .addCase(saveBillingAddress.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(saveShipToAddress.pending, (state) => {
                state.status = 'saving'
            })
            .addCase(saveShipToAddress.fulfilled, (state, action) => {
                state.status = 'idle'
                state.account = action.payload?.customer ?? null;
                state.loaded = true;
            })
            .addCase(saveShipToAddress.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(setDefaultShipTo.pending, (state) => {
                state.status = 'saving';
            })
            .addCase(setDefaultShipTo.fulfilled, (state) => {
                state.status = 'idle'
            })
            .addCase(setDefaultShipTo.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(loadCustomer.pending, (state, action) => {
                state.status = 'loading';
                const customerKey = customerSlug(action.meta.arg);
                if (state.customerKey !== customerKey) {
                    resetCustomerState(state);
                    state.customerKey = customerKey;
                }
            })
            .addCase(loadCustomer.fulfilled, (state, action) => {
                state.status = 'idle';
                state.account = action.payload?.customer ?? null;
                state.loaded = true;
            })
            .addCase(loadCustomer.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(dismissContextAlert, (state, action) => {
                if ([saveBillingAddress.typePrefix, saveShipToAddress.typePrefix, loadCustomer.typePrefix].includes(action.payload)) {
                    state.status = 'idle'
                }
            })
            .addCase(setUserAccess.pending, (state, action) => {
                const customerKey = customerSlug(action.meta.arg);
                if (!action.meta.arg?.isRepAccount && state.customerKey !== customerKey) {
                    resetCustomerState(state);
                }
            })
            .addCase(loadCustomerList.fulfilled, (state, action) => {
                if (state.customerKey) {
                    const customer = action.payload.find(customer => customerSlug(customer) === state.customerKey);
                    state.customerKey = customer ? customerSlug(customer) : null;
                    state.account = customer ? {...emptyCustomer, ...customer} : null;
                    state.loaded = !!customer;
                }
            })
    },
    selectors: {
        selectCustomerKey: (state) => state.customerKey,
        selectCustomerAccount: (state) => state.account,
        selectCustomerLoadStatus: (state) => state.status,
        selectCustomerLoaded: (state) => state.loaded,
        selectCustomerReturnToPath: (state) => state.returnToPath,
    }
});

export default currentCustomerSlice;

export const {setReturnToPath} = currentCustomerSlice.actions;
export const {
    selectCustomerKey,
    selectCustomerAccount,
    selectCustomerLoadStatus,
    selectCustomerLoaded,
    selectCustomerReturnToPath,
} = currentCustomerSlice.selectors;


function resetCustomerState(state: WritableDraft<CurrentCustomerState>) {
    state.customerKey = null;
    state.account = null;
    state.status = 'idle';
    state.loaded = false;
    state.returnToPath = null;
}
