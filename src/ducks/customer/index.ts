import {companyCode, customerSlug, emptyCustomer} from "@/utils/customer";
import {createReducer} from "@reduxjs/toolkit";
import {
    loadCustomer,
    saveBillingAddress,
    saveShipToAddress,
    setCustomerAccount,
    setDefaultShipTo,
    setReturnToPath
} from "./actions";
import {loadCustomerList} from '../customers/actions'
import {setLoggedIn, setUserAccess} from "../user/actions";
import {dismissContextAlert} from "../alerts/alertsSlice";
import {customerResponseToState} from "./utils";
import type {BillToCustomer, CustomerContact, CustomerUser, Editable, ShipToCustomer, SortProps} from "chums-types/b2b";
import type {LoadStatus} from "@/types/generic";


export interface CustomerState {
    company: string;
    key: string | null;
    account: (BillToCustomer & Editable) | null;
    contacts: CustomerContact[];
    loadStatus: LoadStatus;
    loading: boolean;
    saving: boolean;
    loaded: boolean;
    returnToPath: string | null;
}

/**
 * @TODO: Should the basic customer be restored from the LocalStore?
 * @TODO: Can is be stored in the CustomerKey value (currently is key in the below state)?
 * -- working towards migrating currentCustomer from user reducer to customer reducer
 * code snippet below:
 * const isLoggedIn = auth.loggedIn();
 * const customer = isLoggedIn
 *         ? LocalStore.getItem<BasicCustomer | null>(STORE_CUSTOMER, getFirstCustomer(accounts) ?? null)
 *         : null;
 */
export const initialCustomerState = (): CustomerState => ({
    company: 'chums',
    key: null,
    account: null,
    contacts: [],
    loadStatus: 'idle',
    loading: false,
    loaded: false,
    saving: false,
    returnToPath: null,
});

const customerReducer = createReducer(initialCustomerState(), builder => {
    builder
        .addCase(setCustomerAccount.fulfilled, (state, action) => {
            state.company = companyCode('chums');
            if (!!state.account && (
                state.account.ARDivisionNo !== action.payload.customer.ARDivisionNo
                || state.account.CustomerNo !== action.payload.customer.CustomerNo
                || (state.account.ShipToCode ?? '') !== (action.payload.customer.ShipToCode ?? '')
            )) {
                state.contacts = [];
            }
            state.account = {...emptyCustomer, ...action.payload.customer};
        })
        .addCase(setLoggedIn, (state, action) => {
            if (!action.payload?.loggedIn) {
                const initialState = initialCustomerState();
                state.key = initialState.key;
                state.account = initialState.account;
                state.contacts = initialState.contacts;
                state.loaded = false;
            }
        })
        .addCase(saveBillingAddress.pending, (state) => {
            state.loading = true;
        })
        .addCase(saveBillingAddress.fulfilled, (state, action) => {
            state.loadStatus = 'idle';
            state.loading = false;
            state.account = action.payload?.customer  ?? null;
            state.contacts = action.payload?.contacts ?? [];
            state.loaded = true;
        })
        .addCase(saveBillingAddress.rejected, (state) => {
            state.loading = false;
            state.loadStatus = 'idle';
        })
        .addCase(saveShipToAddress.pending, (state) => {
            state.loading = true;
            state.loadStatus = 'pending';
        })
        .addCase(saveShipToAddress.fulfilled, (state, action) => {
            state.loading = false;
            state.loadStatus = 'idle';
            state.account = action.payload?.customer  ?? null;
            state.contacts = action.payload?.contacts ?? [];
            state.loaded = true;

        })
        .addCase(saveShipToAddress.rejected, (state) => {
            state.loading = false;
        })
        .addCase(setDefaultShipTo.pending, (state) => {
            state.loading = true;
        })
        .addCase(setDefaultShipTo.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(setDefaultShipTo.rejected, (state) => {
            state.loading = false;
        })
        .addCase(loadCustomer.pending, (state, action) => {
            state.loadStatus = 'pending';
            if (state.key !== customerSlug(action.meta.arg)) {
                state.account = null;
                state.contacts = [];
                state.loaded = false;
            }
            state.key = customerSlug(action.meta.arg);
            state.loading = true;
        })
        .addCase(loadCustomer.fulfilled, (state, action) => {
            state.loadStatus = 'idle';
            state.loading = false;
            state.account = action.payload?.customer  ?? null;
            state.contacts = action.payload?.contacts ?? [];
            state.loaded = true;
        })
        .addCase(loadCustomer.rejected, (state) => {
            state.loadStatus = 'rejected';
            state.loading = false;
        })
        .addCase(dismissContextAlert, (state, action) => {
            if (action.payload === loadCustomer.typePrefix) {
                state.loadStatus = 'idle';
            }
        })
        .addCase(setUserAccess.pending, (state, action) => {
            if (!action.meta.arg?.isRepAccount && customerSlug(state.account) !== customerSlug(action.meta.arg)) {
                state.account = null;
                state.contacts = [];
                state.loaded = true;
            }
        })
        .addCase(setReturnToPath, (state, action) => {
            state.returnToPath = action.payload;
        })
        .addCase(loadCustomerList.fulfilled, (state, action) => {
            if (state.account) {
                const [customer] = action.payload.filter(customer => customerSlug(customer) === customerSlug(state.account));
                if (!customer) {
                    state.account = null;
                    state.contacts = [];
                    state.loaded = true;
                }
            }
        })
})

export default customerReducer;
