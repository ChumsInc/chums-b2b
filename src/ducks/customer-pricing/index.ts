import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {CustomerPriceRecord} from "b2b-types";
import {customerSlug, priceKey, shortCustomerKey} from "@/utils/customer";
import {setLoggedIn, setUserAccess} from "@/ducks/user/actions";
import {loadCustomer, saveBillingAddress, saveShipToAddress, setCustomerAccount} from "@/ducks/customer/actions";

const adapter = createEntityAdapter<CustomerPriceRecord, string>({
    selectId: (arg: CustomerPriceRecord) => priceKey(arg),
    sortComparer: (a, b) => priceKey(a).localeCompare(priceKey(b))
});

const selectors = adapter.getSelectors();

export interface PricingState {
    customerKey: string | null;
}
const initialState: PricingState = {
    customerKey: null,
}

const pricingSlice = createSlice({
    name: 'customer-pricing',
    initialState: adapter.getInitialState(initialState),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setLoggedIn, (state, action) => {
                if (!action.payload?.loggedIn) {
                    state.customerKey = null;
                    adapter.removeAll(state);
                }
            })
            .addCase(loadCustomer.pending, (state, action) => {
                if (shortCustomerKey(action.meta.arg) !== state.customerKey ) {
                    adapter.removeAll(state);
                }
            })
            .addCase(loadCustomer.fulfilled, (state, action) => {
                state.customerKey = shortCustomerKey(action.payload?.customer ?? null);
                adapter.setAll(state, action.payload?.pricing ?? []);
            })
            .addCase(setCustomerAccount.fulfilled, (state, action) => {
                if (state.customerKey !== shortCustomerKey(action.payload.customer)) {
                    adapter.removeAll(state);
                    state.customerKey = shortCustomerKey(action.payload.customer);
                }
            })
            .addCase(saveBillingAddress.fulfilled, (state, action) => {
                if (action.payload) {
                    adapter.setAll(state, action.payload.pricing ?? []);
                }
            })
            .addCase(saveShipToAddress.fulfilled, (state, action) => {
                if (action.payload) {
                    adapter.setAll(state, action.payload.pricing ?? []);
                }
            })
            .addCase(setUserAccess.pending, (state, action) => {
                if (!action.meta.arg?.isRepAccount && state.customerKey !== shortCustomerKey(action.meta.arg)) {
                    adapter.removeAll(state);
                }
            })
    },
    selectors: {
        selectCustomerPricing: (state) => selectors.selectAll(state),
    }
});

export const {selectCustomerPricing} = pricingSlice.selectors;

export default pricingSlice
