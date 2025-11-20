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
    loadCustomerUsers,
    removeUser,
    saveBillingAddress,
    saveShipToAddress,
    saveUser,
    setCustomerAccount
} from "@/ducks/customer/actions.js";
import {customerSlug, customerUserSorter} from "@/utils/customer.js";
import {setLoggedIn, setUserAccess} from "@/ducks/user/actions.js";
import {loadCustomerList} from "@/ducks/customers/actions.js";
import {selectPermittedBillToAddress} from "@/ducks/customer/selectors.js";
import {selectPermittedShipToAddresses} from "@/ducks/customer/customerShipToAddressSlice.js";

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
            .addCase(loadCustomerUsers.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(loadCustomerUsers.fulfilled, (state, action) => {
                state.status = 'idle';
                adapter.setAll(state, action.payload);
            })
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
            .addCase(saveBillingAddress.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload?.users ?? []);
            })
            .addCase(saveShipToAddress.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload?.users ?? []);
            })
            .addCase(loadCustomer.pending, (state, action) => {
                if (state.customerKey !== customerSlug(action.meta.arg)) {
                    adapter.removeAll(state);
                }
            })
            .addCase(loadCustomer.fulfilled, (state, action) => {
                adapter.setAll(state, action.payload?.users ?? []);
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
            .addMatcher(isAnyOf(loadCustomerUsers.rejected, removeUser.rejected, saveUser.rejected), (state) => {
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
    [selectCustomerUsers, selectPermittedBillToAddress, selectPermittedShipToAddresses, selectCustomerUsersSort],
    (users, billTo, shipToAddresses, sort) => {
        return users
            .filter(user => billTo || shipToAddresses.filter(addr => user.shipToCode?.includes(addr.ShipToCode)).length > 0)
            .sort(customerUserSorter(sort));
    }
)


function isDismissedAction(action: UnknownAction | PayloadAction<string>): boolean {
    if (typeof action.payload === 'string') {
        return [saveUser.typePrefix, removeUser.typePrefix, loadCustomerUsers.typePrefix].includes(action.payload)
    }
    return false;
}
