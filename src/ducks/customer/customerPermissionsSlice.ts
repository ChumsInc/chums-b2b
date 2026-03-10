import type {CustomerPermissions} from "@/types/customer";
import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import {setLoggedIn} from "@/ducks/user/actions";
import {
    loadCustomer,
    loadCustomerPermissions,
    saveBillingAddress,
    saveShipToAddress,
    setDefaultShipTo
} from "@/ducks/customer/actions";
import {billToCustomerSlug} from "@/utils/customer";
import {dismissContextAlert} from "@/ducks/alerts/alertsSlice";

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
            .addCase(dismissContextAlert, (state, action) => {
                if (action.payload === loadCustomerPermissions.typePrefix) {
                    state.status = 'idle';
                }
            })
            .addMatcher(isAnyOf(
                loadCustomer.fulfilled,
                saveBillingAddress.fulfilled,
                saveShipToAddress.fulfilled,
                setDefaultShipTo.fulfilled,
            ), (state, action) => {
                state.customerKey = billToCustomerSlug(action.payload?.customer ?? null);
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
