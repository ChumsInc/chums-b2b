import {createEntityAdapter, createSelector, createSlice, isAnyOf, type PayloadAction} from "@reduxjs/toolkit";
import type {ShipToCustomer, SortProps} from "b2b-types";
import {loadCustomer, saveBillingAddress, saveShipToAddress, setCustomerAccount} from "@/ducks/customer/actions.ts";
import {customerShipToSorter, customerSlug} from "@/utils/customer.ts";
import {setLoggedIn, setUserAccess} from "@/ducks/user/actions.ts";
import {loadCustomerList} from "@/ducks/customers/actions.ts";
import {selectCustomerAccount} from "@/ducks/customer/selectors.ts";
import {selectCurrentAccess} from "@/ducks/user/userAccessSlice.ts";
import {filterShipToByUserAccount} from "@/ducks/customer/utils.ts";
import {isBillToCustomer} from "@/utils/typeguards.ts";
import {selectCustomerPermissions} from "@/ducks/customer/customerPermissionsSlice.ts";

const adapter = createEntityAdapter<ShipToCustomer, string>({
    selectId: (arg) => arg.ShipToCode,
    sortComparer: (a, b) => a.ShipToCode.localeCompare(b.ShipToCode),
})

const selectors = adapter.getSelectors();

export interface CustomerShipToAddressState {
    customerKey: string | null;
    shipToCode: string | null;
    sort: SortProps<ShipToCustomer>
}

const extraState: CustomerShipToAddressState = {
    customerKey: null,
    shipToCode: null,
    sort: {field: 'ShipToCode', ascending: true},
}

const customerShipToAddressSlice = createSlice({
    name: 'customerShipToAddress',
    initialState: adapter.getInitialState(extraState),
    reducers: {
        setShipToCode: (state, action) => {
            state.shipToCode = action.payload;
        },
        setShipToSort: (state, action: PayloadAction<SortProps<ShipToCustomer>>) => {
            state.sort = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(setCustomerAccount.fulfilled, (state, action) => {
                const customerKey = customerSlug(action.payload);
                if (state.customerKey !== customerKey) {
                    state.customerKey = customerKey;
                    adapter.removeAll(state);
                }
            })
            .addCase(setLoggedIn, (state, action) => {
                if (!action.payload.loggedIn) {
                    adapter.removeAll(state);
                }
            })
            .addCase(loadCustomer.pending, (state, action) => {
                const customerKey = customerSlug(action.meta.arg);
                if (state.customerKey !== customerKey) {
                    state.customerKey = customerKey;
                    adapter.removeAll(state);
                }
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
            .addMatcher(isAnyOf(loadCustomer.fulfilled, saveBillingAddress.fulfilled, saveShipToAddress.fulfilled), (state, action) => {
                state.customerKey = customerSlug(action.payload?.customer ?? null);
                const list = action.payload?.shipTo ?? [];
                adapter.setAll(state, list);
                if (state.shipToCode) {
                    const current = list.find(st => st.ShipToCode === state.shipToCode);
                    state.shipToCode = current?.ShipToCode ?? null;
                }
            })
    },
    selectors: {
        selectCustomerShipToCode: (state) => state.shipToCode,
        selectCustomerShipTo: (state) => selectors.selectById(state, state.shipToCode),
        selectCustomerShipToAddresses: (state) => selectors.selectAll(state),
        selectShipToByCode: (state, code: string) => selectors.selectById(state, code) ?? null,
        selectShipToSort: (state) => state.sort,
    }
})

export default customerShipToAddressSlice;
export const {setShipToCode, setShipToSort} = customerShipToAddressSlice.actions;
export const {
    selectCustomerShipToCode,
    selectCustomerShipTo,
    selectCustomerShipToAddresses,
    selectShipToSort,
    selectShipToByCode
} = customerShipToAddressSlice.selectors;

export const selectPermittedShipToAddresses = createSelector(
    [selectCustomerShipToAddresses, selectCustomerPermissions, selectCurrentAccess],
    (addresses, permissions, access) => {
        if (permissions?.billTo) {
            return [...addresses]
                .filter(filterShipToByUserAccount(access))
                .sort(customerShipToSorter({field: 'ShipToName', ascending: true}));
        }
        return addresses
            .filter(address => !access?.isRepAccount
                || (
                    [address.SalespersonDivisionNo, '%'].includes(access.SalespersonDivisionNo)
                    && [address.SalespersonDivisionNo, '%'].includes(access.SalespersonDivisionNo)
                ))
            .filter(addr => permissions?.shipTo.includes(addr.ShipToCode))
            .sort(customerShipToSorter({field: 'ShipToName', ascending: true}));
    }
)

export const selectSortedShipToList = createSelector(
    [selectPermittedShipToAddresses, selectShipToSort],
    (list, sort) => {
        return [...list].sort(customerShipToSorter(sort));
    }
)
