import {createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import type {RecentCustomer} from "chums-types/b2b";
import {customerSlug} from "@/utils/customer.js";
import {auth} from "@/api/IntranetAuthService.js";
import localStore from "@/utils/LocalStore.js";
import LocalStore from "@/utils/LocalStore.js";
import {STORE_RECENT_ACCOUNTS} from "@/constants/stores.js";
import {setLoggedIn, signInWithGoogle} from "@/ducks/user/actions.js";
import {loadCustomer, setCustomerAccount} from "@/ducks/customer/actions.js";

const adapter = createEntityAdapter<RecentCustomer, string>({
    selectId: (arg) => customerSlug(arg),
    sortComparer: (a, b) => customerSlug(a).localeCompare(customerSlug(b))
})
const selectors = adapter.getSelectors();

const isLoggedIn = auth.loggedIn();
const recentCustomers = isLoggedIn
    ? localStore.getItem<RecentCustomer[]>(STORE_RECENT_ACCOUNTS, [])
    : [];

export const recentCustomersSlice = createSlice({
    name: 'recentCustomers',
    initialState: adapter.getInitialState(undefined, recentCustomers),
    reducers: {
        clearRecentCustomers: (state) => {
            adapter.removeAll(state);
            LocalStore.removeItem(STORE_RECENT_ACCOUNTS);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(setLoggedIn, (state, action) => {
                if (!action.payload.loggedIn) {
                    adapter.removeAll(state);
                } else {
                    adapter.setAll(state, action.payload.recentCustomers ?? []);
                }
            })
            .addCase(signInWithGoogle.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload.recentCustomers ?? [])
            })
            .addCase(setCustomerAccount.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload.recent);
            })
            .addCase(loadCustomer.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload?.recent ?? [])
            })
    },
    selectors: {
        selectAll: (state) => selectors.selectAll(state),
    }
});

export default recentCustomersSlice;

const {selectAll} = recentCustomersSlice.selectors;
export const {clearRecentCustomers} = recentCustomersSlice.actions;

export const selectRecentCustomers = createSelector(
    [selectAll],
    (customers) => {
        return [...customers]
            .sort(c => c.ts).reverse()
    }
);
