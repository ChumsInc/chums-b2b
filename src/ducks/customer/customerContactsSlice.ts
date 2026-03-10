import {createEntityAdapter, createSlice, isAnyOf} from "@reduxjs/toolkit";
import type {CustomerContact} from "chums-types/b2b";
import {setLoggedIn} from "@/ducks/user/actions.ts";
import {loadCustomer, saveBillingAddress, saveShipToAddress, setDefaultShipTo} from "@/ducks/customer/actions.ts";
import {billToCustomerSlug} from "@/utils/customer.ts";
import {loadCustomerList} from "@/ducks/customers/actions.ts";

const adapter = createEntityAdapter<CustomerContact, string>({
    selectId: (arg) => arg.ContactCode,
    sortComparer: (a, b) => a.ContactCode.toUpperCase().localeCompare(b.ContactCode.toUpperCase()),
})

const selectors = adapter.getSelectors();

export interface CustomerContactsState {
    customerKey: string | null;
}

const extraState: CustomerContactsState = {
    customerKey: null,
}

const customerContactsSlice = createSlice({
    name: 'customerContacts',
    initialState: adapter.getInitialState(extraState),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setLoggedIn, (state, action) => {
                if (!action.payload) {
                    state.customerKey = null;
                    adapter.removeAll(state);
                }
            })
            .addCase(loadCustomer.pending, (state, action) => {
                const customerKey = billToCustomerSlug(action.meta.arg);
                if (state.customerKey !== customerKey) {
                    adapter.removeAll(state);
                    state.customerKey = customerKey;
                }
            })
            .addCase(loadCustomerList.fulfilled, (state, action) => {
                if (state.customerKey) {
                    const customer = action.payload.find(_customer => billToCustomerSlug(_customer) === state.customerKey) ?? null;
                    if (!customer) {
                        state.customerKey = null;
                        adapter.removeAll(state);
                    }
                }
            })
            .addMatcher(isAnyOf(
                loadCustomer.fulfilled,
                saveBillingAddress.fulfilled,
                saveShipToAddress.fulfilled,
                setDefaultShipTo.fulfilled,
            ), (state, action) => {
                if (action.payload) {
                    state.customerKey = billToCustomerSlug(action.payload.customer);
                    adapter.setAll(state, action.payload.contacts ?? []);
                }
            })
    },
    selectors: {
        selectAllContacts: (state) => selectors.selectAll(state),
    }
});

export default customerContactsSlice;
export const {selectAllContacts} = customerContactsSlice.selectors;
