import {
    createEntityAdapter,
    createSelector,
    createSlice,
    isAnyOf,
    type PayloadAction,
    type UnknownAction
} from "@reduxjs/toolkit";
import type {CustomerUser, SortProps} from "chums-types/b2b";
import {
    loadCustomer,
    removeUser,
    saveBillingAddress,
    saveShipToAddress,
    saveUser,
    setCustomerAccount,
    setDefaultShipTo
} from "@/ducks/customer/actions";
import {customerSlug, customerUserSorter} from "@/utils/customer";
import {setLoggedIn} from "@/ducks/user/actions";
import {loadCustomerList} from "@/ducks/customers/actions";
import {selectCustomerPermissions} from "@/ducks/customer/customerPermissionsSlice.ts";

const adapter = createEntityAdapter<CustomerUser, number>({
    selectId: (arg) => arg.id,
    sortComparer: (a, b) => a.id - b.id,
});

const selectors = adapter.getSelectors();

export interface CustomerUsersState {
    customerKey: string | null;
    status: 'idle' | 'loading' | 'saving' | 'deleting' | 'rejected';
    sort: SortProps<CustomerUser>;
}

const extraState: CustomerUsersState = {
    customerKey: null,
    status: 'idle',
    sort: {field: 'name', ascending: true}
}

const customerUsersSlice = createSlice({
    name: 'customerUsers',
    initialState: adapter.getInitialState(extraState),
    reducers: {
        setCustomerUsersSort: (state, action: PayloadAction<SortProps<CustomerUser>>) => {
            state.sort = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveUser.pending, (state) => {
                state.status = 'saving';
            })
            .addCase(saveUser.fulfilled, (state, action) => {
                state.status = 'idle';
                adapter.setAll(state, action.payload);
            })
            .addCase(removeUser.pending, (state) => {
                state.status = 'deleting'
            })
            .addCase(removeUser.fulfilled, (state, action) => {
                state.status = 'idle';
                adapter.setAll(state, action.payload);
            })
            .addCase(setCustomerAccount.fulfilled, (state, action) => {
                const nextKey = customerSlug(action.payload.customer);
                if (state.customerKey !== nextKey) {
                    adapter.removeAll(state);
                }
                state.customerKey = nextKey;
            })
            .addCase(setLoggedIn, (state, action) => {
                if (!action.payload.loggedIn) {
                    adapter.removeAll(state);
                }
            })
            .addCase(loadCustomer.pending, (state, action) => {
                if (state.customerKey !== customerSlug(action.meta.arg)) {
                    adapter.removeAll(state);
                }
            })
            .addCase(loadCustomerList.fulfilled, (state, action) => {
                if (state.customerKey) {
                    const customer = action.payload.find(_customer => customerSlug(_customer) === state.customerKey);
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
                state.customerKey = customerSlug(action.payload?.customer ?? null);
                adapter.setAll(state, action.payload?.users ?? []);
            })
            .addMatcher(isAnyOf(
                removeUser.rejected,
                saveUser.rejected
            ), (state) => {
                state.status = 'rejected';
            })
            .addMatcher(isDismissedAction, (state) => {
                state.status = 'idle';
            })
    },
    selectors: {
        selectCustomerUsers: (state) => selectors.selectAll(state),
        selectCustomerUsersSort: (state) => state.sort,
        selectCustomerUsersStatus: (state) => state.status,
    }
})

export default customerUsersSlice;
export const {setCustomerUsersSort} = customerUsersSlice.actions;
export const {selectCustomerUsers, selectCustomerUsersStatus, selectCustomerUsersSort} = customerUsersSlice.selectors;

export const selectPermittedCustomerUsers = createSelector(
    [selectCustomerUsers, selectCustomerPermissions, selectCustomerUsersSort],
    (users, permissions, sort) => {
        return users
            .filter(user => permissions?.billTo || !!permissions?.shipTo?.filter(st => user.shipToCode?.includes(st))?.length)
            .sort(customerUserSorter(sort));
    }
)


function isDismissedAction(action: UnknownAction | PayloadAction<string>): boolean {
    if (typeof action.payload === 'string') {
        return [saveUser.typePrefix, removeUser.typePrefix].includes(action.payload)
    }
    return false;
}
