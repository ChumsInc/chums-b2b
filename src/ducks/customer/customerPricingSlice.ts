import {createEntityAdapter, createSlice, isAnyOf} from "@reduxjs/toolkit";
import type {CustomerPriceRecord} from "chums-types/b2b";
import {billToCustomerSlug, customerPriceCodeKey} from "@/utils/customer";
import {
    loadCustomer,
    saveBillingAddress,
    saveShipToAddress,
    setCustomerAccount,
    setDefaultShipTo
} from "@/ducks/customer/actions";
import {setLoggedIn} from "@/ducks/user/actions";
import {loadCustomerList} from "@/ducks/customers/actions";

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
                const customerKey = billToCustomerSlug(action.payload.customer);
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
            .addCase(loadCustomer.pending, (state, action) => {
                const customerKey = billToCustomerSlug(action.meta.arg);
                if (state.customerKey !== customerKey) {
                    state.customerKey = customerKey;
                    adapter.removeAll(state);
                }
            })
            .addCase(loadCustomerList.fulfilled, (state, action) => {
                if (state.customerKey) {
                    const customer = action.payload.find(_customer => billToCustomerSlug(_customer) === state.customerKey);
                    if (!customer) {
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
                state.customerKey = billToCustomerSlug(action.payload?.customer ?? null)
                adapter.setAll(state, action.payload?.pricing ?? [])
            })
    },
    selectors: {
        selectCustomerPricing: (state) => selectors.selectAll(state),
        selectCustomerPricingById: (state, key: string) => selectors.selectById(state, key)
    }
})

export default customerPricingSlice;
export const {selectCustomerPricing, selectCustomerPricingById} = customerPricingSlice.selectors;
