import {createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import type {CustomerPaymentCard} from "b2b-types";
import {loadCustomer, saveBillingAddress, saveShipToAddress, setCustomerAccount} from "@/ducks/customer/actions";
import {customerSlug} from "@/utils/customer";
import {setLoggedIn, setUserAccess} from "@/ducks/user/actions";
import {loadCustomerList} from "@/ducks/customers/actions";
import dayjs from "dayjs";

const adapter = createEntityAdapter<CustomerPaymentCard, string>({
    selectId: (arg) => arg.CreditCardGUID,
    sortComparer: (a, b) => a.CreditCardGUID.localeCompare(b.CreditCardGUID),
})

const selectors = adapter.getSelectors();

export interface CustomerPaymentCardsState {
    customerKey: string | null;
}

const extraState: CustomerPaymentCardsState = {
    customerKey: null,
}

const customerPaymentCardsSlice = createSlice({
    name: 'customerPaymentCards',
    initialState: adapter.getInitialState(extraState),
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(setCustomerAccount.fulfilled, (state, action) => {
                const customerKey = customerSlug(action.payload.customer);
                if (state.customerKey !== customerKey) {
                    state.customerKey = customerKey;
                    adapter.removeAll(state);
                }
            })
            .addCase(setLoggedIn, (state, action) => {
                if (!action.payload.loggedIn) {
                    state.customerKey = null;
                    adapter.removeAll(state);
                }
            })
            .addCase(saveBillingAddress.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload?.paymentCards ?? []);
            })
            .addCase(saveShipToAddress.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload?.paymentCards ?? []);
            })
            .addCase(loadCustomer.pending, (state, action) => {
                const customerKey = customerSlug(action.meta.arg);
                if (state.customerKey !== customerKey) {
                    state.customerKey = customerKey;
                    adapter.removeAll(state);
                }
            })
            .addCase(loadCustomer.fulfilled, (state, action) => {
                state.customerKey = customerSlug(action.payload?.customer ?? null);
                adapter.setAll(state, action.payload?.paymentCards ?? []);
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
        selectCustomerPaymentCards: (state) => selectors.selectAll(state),
    }
})

export default customerPaymentCardsSlice;
export const {selectCustomerPaymentCards} = customerPaymentCardsSlice.selectors;

export const selectActiveCustomerPaymentCards = createSelector(
    [selectCustomerPaymentCards],
    (cards) => {
        const exp = dayjs().format('YYYY-MM');
        return cards.filter(card => `${card.ExpirationDateYear}-${card.ExpirationDateMonth}` >= exp);
    }
)
