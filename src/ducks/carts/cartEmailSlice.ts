import type {EmailResponse} from "chums-types/b2b";
import {createSlice, type WritableDraft} from "@reduxjs/toolkit";
import {setLoggedIn, setUserAccess} from "@/ducks/user/actions";
import {customerSlug} from "@/utils/customer";
import {loadCustomer, setCustomerAccount} from "@/ducks/customer/actions";
import {sendCartEmail} from "@/ducks/carts/actions";

interface CartEmailState {
    customerKey: string | null;
    status: 'idle' | 'sending' | 'fulfilled' | 'rejected';
    response: EmailResponse | null;
    error: string | null;
}

const initialState: CartEmailState = {customerKey: null, status: 'idle', response: null, error: null};

const cartEmailSlice = createSlice({
    name: 'cartEmail',
    initialState,
    reducers: {
        closeEmailResponse: (state) => {
            state.status = 'idle';
            state.response = null;
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(setLoggedIn, (state, action) => {
                if (!action.payload.loggedIn) {
                    resetCartEmail(state, null);
                }
            })
            .addCase(setUserAccess.pending, (state, action) => {
                const customerKey = customerSlug(action?.meta?.arg);
                if (!action.meta.arg?.isRepAccount && state.customerKey !== customerKey) {
                    resetCartEmail(state, customerKey);
                }
            })
            .addCase(loadCustomer.pending, (state, action) => {
                const customerKey = customerSlug(action.meta.arg);
                if (state.customerKey !== customerKey) {
                    resetCartEmail(state, customerKey);
                }
            })
            .addCase(setCustomerAccount.fulfilled, (state, action) => {
                const customerKey = customerSlug(action.payload.customer);
                if (state.customerKey !== customerKey) {
                    resetCartEmail(state, customerKey);
                }
            })
            .addCase(sendCartEmail.pending, (state) => {
                state.status = 'sending'
                state.response = null;
                state.error = null;
            })
            .addCase(sendCartEmail.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.response = action.payload;
                state.error = null;
            })
            .addCase(sendCartEmail.rejected, (state, action) => {
                state.status = 'rejected';
                state.response = null;
                state.error = action.error.message ?? null;
            })
    },
    selectors: {
        selectSendEmailResponse: (state) => state.response,
        selectSendEmailStatus: (state) => state.status,
        selectSendEmailError: (state) => state.error,
    }
});

export default cartEmailSlice;
export const {closeEmailResponse} = cartEmailSlice.actions;
export const {selectSendEmailResponse, selectSendEmailStatus, selectSendEmailError} = cartEmailSlice.selectors;


function resetCartEmail(state: WritableDraft<CartEmailState>, customerKey: string | null) {
    state.status = 'idle';
    state.response = null;
    state.error = customerKey;
}
