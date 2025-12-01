import {createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import type {RecentCustomer} from "chums-types/b2b";
import {customerSlug} from "@/utils/customer";
import {auth} from "@/api/IntranetAuthService";
import localStore from "@/utils/LocalStore";
import LocalStore from "@/utils/LocalStore";
import {STORE_RECENT_ACCOUNTS} from "@/constants/stores";
import {setLoggedIn, signInWithGoogle} from "@/ducks/user/actions";
import {loadCustomer, setCustomerAccount} from "@/ducks/customer/actions";


export interface RecentCustomersState {
    updated: boolean;
}

const adapter = createEntityAdapter<RecentCustomer, string>({
    selectId: (arg) => customerSlug(arg),
    sortComparer: (a, b) => customerSlug(a).localeCompare(customerSlug(b))
})
const selectors = adapter.getSelectors();

function recentCustomers() {
    const isLoggedIn = auth.loggedIn();
    return isLoggedIn
        ? localStore.getItem<RecentCustomer[]>(STORE_RECENT_ACCOUNTS, [])
        : [];
}

const extraState:RecentCustomersState = {
    updated: false,
}

export const recentCustomersSlice = createSlice({
    name: 'recentCustomers',
    initialState: adapter.getInitialState(extraState, recentCustomers()),
    reducers: {
        clearRecentCustomers: (state) => {
            adapter.removeAll(state);
            LocalStore.removeItem(STORE_RECENT_ACCOUNTS);
        },
        updateRecentCustomers: (state) => {
            adapter.setAll(state, recentCustomers());
            state.updated = true;
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
        selectRecentCustomersUpdated: (state) => state.updated,
    }
});

export default recentCustomersSlice;

export const {selectAll, selectRecentCustomersUpdated} = recentCustomersSlice.selectors;
export const {clearRecentCustomers, updateRecentCustomers} = recentCustomersSlice.actions;

export const selectRecentCustomers = createSelector(
    [selectAll],
    (customers) => {
        return [...customers]
            .sort(c => c.ts).reverse()
    }
);
