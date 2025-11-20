import type {CustomerPermissions} from "@/types/customer";
import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import {setLoggedIn, setUserAccess} from "@/ducks/user/actions.js";
import {loadCustomer, loadCustomerPermissions, saveBillingAddress, saveShipToAddress} from "@/ducks/customer/actions.js";
import {customerSlug} from "@/utils/customer.js";
import {dismissContextAlert} from "@/ducks/alerts/alertsSlice.js";

export interface CustomerPermissionsState {
    customerKey: string | null;
    values: CustomerPermissions | null;
    status: 'idle' | 'loading' | 'rejected' | 'fulfilled';
}

const initialState: CustomerPermissionsState = {
    customerKey: null,
    values: null,
    status: 'idle',
}

const customerPermissionsSlice = createSlice({
    name: 'customerPermissions',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(setLoggedIn, (state, action) => {
                if (!action.payload.loggedIn) {
                    state.customerKey = null;
                    state.values = null;
                    state.status = 'idle';
                }
            })
            .addCase(setUserAccess.fulfilled, (state, action) => {
                if (!action.meta.arg?.isRepAccount && customerSlug(action.meta.arg) !== state.customerKey) {
                    state.status = 'idle';
                    state.customerKey = customerSlug(action.meta.arg);
                    state.values = null;
                }
            })
            .addCase(loadCustomerPermissions.pending, (state, action) => {
                const customerKey = customerSlug(action.meta.arg);
                state.status = 'loading';
                if (state.customerKey !== customerKey) {
                    state.values = null;
                    state.customerKey = customerKey;
                }
            })
            .addCase(loadCustomerPermissions.fulfilled, (state, action) => {
                state.customerKey = customerSlug(action.meta.arg);
                state.values = action.payload;
                state.status = 'fulfilled';
            })
            .addCase(loadCustomerPermissions.rejected, (state, action) => {
                state.status = 'rejected';
            })
            .addCase(dismissContextAlert, (state, action) => {
                if (action.payload === loadCustomerPermissions.typePrefix) {
                    state.status = 'idle';
                }
            })
            .addMatcher(isAnyOf(
                saveBillingAddress.fulfilled,
                saveShipToAddress.fulfilled,
                loadCustomer.fulfilled), (state, action) => {
                state.customerKey = customerSlug(action.payload?.customer ?? null);
                state.values = action.payload?.permissions ?? null;
            })
    },
    selectors: {
        selectCustomerPermissions: (state) => state.values,
        selectCustomerPermissionsStatus: (state) => state.status,
    }
});

export default customerPermissionsSlice;
export const {selectCustomerPermissions, selectCustomerPermissionsStatus} = customerPermissionsSlice.selectors;
