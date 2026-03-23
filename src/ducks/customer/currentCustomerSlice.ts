import type {BillToCustomer} from "chums-types/b2b";
import {createSlice, isAnyOf, type PayloadAction, type WritableDraft} from "@reduxjs/toolkit";
import {
    loadCustomer,
    saveBillingAddress,
    saveShipToAddress,
    setCustomerAccount,
    setDefaultShipTo
} from "@/ducks/customer/actions";
import {customerSlug, emptyCustomer} from "@/utils/customer";
import {setLoggedIn} from "@/ducks/user/actions";
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
            .addCase(loadCustomer.pending, (state, action) => {
                state.status = 'loading';
                const customerKey = customerSlug(action.meta.arg);
                if (state.customerKey !== customerKey) {
                    resetCustomerState(state);
                    state.customerKey = customerKey;
                }
            })
            .addCase(dismissContextAlert, (state, action) => {
                if ([loadCustomer.typePrefix,
                    setDefaultShipTo.typePrefix,
                    saveBillingAddress.typePrefix,
                    saveShipToAddress.typePrefix].includes(action.payload)) {
                    state.status = 'idle'
                }
            })
            .addCase(loadCustomerList.fulfilled, (state, action) => {
                if (state.customerKey) {
                    const customer = action.payload.find(_customer => customerSlug(_customer) === state.customerKey);
                    if (!customer) {
                        state.customerKey = null;
                        state.account = null;
                    }
                }
            })
            .addMatcher(isAnyOf(saveBillingAddress.pending, saveShipToAddress.pending, setDefaultShipTo.pending),
                (state) => {
                state.status = 'saving'
            })
            .addMatcher(isAnyOf(
                loadCustomer.fulfilled,
                setDefaultShipTo.fulfilled,
                saveBillingAddress.fulfilled,
                saveShipToAddress.fulfilled,
            ), (state, action) => {
                state.status = 'idle';
                state.account = action.payload?.customer ?? null;
                state.loaded = true;
            })
            .addMatcher(isAnyOf(
                loadCustomer.rejected,
                setDefaultShipTo.rejected,
                saveBillingAddress.rejected,
                saveShipToAddress.rejected,
            ), (state) => {
                state.status = 'rejected'
            })
    },
    selectors: {
        selectCustomerKey: (state) => state.customerKey,
        selectCustomerAccount: (state) => state.account,
        selectCustomerLoadStatus: (state) => state.status,
        selectCustomerLoaded: (state) => state.loaded,
        selectCustomerReturnToPath: (state) => state.returnToPath,
        selectPrimaryShipToCode: (state) => state.account?.ShipToCode ?? null,
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
    selectPrimaryShipToCode,
} = currentCustomerSlice.selectors;


function resetCustomerState(state: WritableDraft<CurrentCustomerState>) {
    state.customerKey = null;
    state.account = null;
    state.status = 'idle';
    state.loaded = false;
    state.returnToPath = null;
}
