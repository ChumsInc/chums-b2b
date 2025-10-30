import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import type {CustomerPriceRecord} from "b2b-types";
import {customerPriceCodeKey, customerSlug} from "@/utils/customer.ts";
import {loadCustomer, saveBillingAddress, saveShipToAddress, setCustomerAccount} from "@/ducks/customer/actions.ts";
import {setLoggedIn, setUserAccess} from "@/ducks/user/actions.ts";
import {loadCustomerList} from "@/ducks/customers/actions.ts";

const adapter = createEntityAdapter<CustomerPriceRecord, string>({
    selectId: arg => customerPriceCodeKey(arg),
    sortComparer: (a, b) => customerPriceCodeKey(a).localeCompare(customerPriceCodeKey(b))
})

const selectors = adapter.getSelectors();

export interface CustomerPricingState {
    customerKey: string | null;
}

const extraState: CustomerPricingState = {
    customerKey: null,
}

const customerPricingSlice = createSlice({
    name: 'customerPricing',
    initialState: adapter.getInitialState(extraState),
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(setCustomerAccount.fulfilled, (state, action) => {
                const customerKey = customerSlug(action.payload.customer);
                if (state.customerKey !== customerKey) {
                    adapter.removeAll(state);
                }
                state.customerKey = customerKey;
            })
            .addCase(setLoggedIn, (state, action) => {
                if (!action.payload.loggedIn) {
                    adapter.removeAll(state);
                    state.customerKey = null;
                }
            })
            .addCase(saveBillingAddress.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload?.pricing ?? []);
            })
            .addCase(saveShipToAddress.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload?.pricing ?? []);
            })
            .addCase(loadCustomer.pending, (state, action) => {
                const customerKey = customerSlug(action.meta.arg);
                if (state.customerKey !== customerKey) {
                    state.customerKey = customerKey;
                    adapter.removeAll(state);
                }
            })
            .addCase(loadCustomer.fulfilled, (state, action) => {
                state.customerKey = customerSlug(action.payload?.customer ?? null)
                adapter.setAll(state, action.payload?.pricing ?? [])
            })
            .addCase(setUserAccess.pending, (state, action) => {
                if (!action.meta.arg?.isRepAccount && customerSlug(action.meta.arg) !== state.customerKey) {
                    adapter.removeAll(state);
                }
            })
            .addCase(loadCustomerList.fulfilled, (state, action) => {
                if (state.customerKey) {
                    const customer = action.payload.find(customer => customerSlug(customer) === state.customerKey);
                    if (!customer) {
                        adapter.removeAll(state);
                    }
                }
            })
    },
    selectors: {
        selectCustomerPricing: (state) => selectors.selectAll(state),
        selectCustomerPricingById: (state, key: string) => selectors.selectById(state, key)
    }
})

export default customerPricingSlice;
export const {selectCustomerPricing, selectCustomerPricingById} = customerPricingSlice.selectors;
