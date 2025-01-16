import {
    companyCode,
    customerShipToSorter,
    customerSlug,
    customerUserSorter,
    defaultCustomerUserSort,
    defaultShipToSort,
    emptyCustomer
} from "@utils/customer";
import {createReducer} from "@reduxjs/toolkit";
import {
    BillToCustomer,
    CustomerContact,
    CustomerPaymentCard,
    CustomerPriceRecord,
    CustomerUser,
    Editable,
    ShipToCustomer, SortProps
} from "b2b-types";
import {
    loadCustomer,
    loadCustomerPermissions,
    loadCustomerUsers,
    removeUser,
    saveBillingAddress,
    saveShipToAddress,
    saveUser,
    setCustomerAccount,
    setDefaultShipTo,
    setReturnToPath,
    setShipToCode, setCustomerUserSort
} from "./actions";
import {loadCustomerList} from '../customers/actions'
import {setLoggedIn, setUserAccess} from "../user/actions";
import {LoadStatus, Selectable} from "@typeDefs/generic";
import {CustomerPermissions} from "@typeDefs/customer";
import {dismissContextAlert} from "../alerts/actions";
import {customerResponseToState} from "./utils";

export interface CustomerPermissionsState {
    values: CustomerPermissions | null;
    loading: boolean;
    loaded: boolean;
}


export interface CustomerState {
    company: string;
    key: string | null;
    account: (BillToCustomer & Editable) | null;
    shipToCode: string | null;
    shipTo: ShipToCustomer | null;
    contacts: CustomerContact[];
    pricing: CustomerPriceRecord[];
    shipToAddresses: (ShipToCustomer & Editable)[];
    paymentCards: CustomerPaymentCard[];
    permissions: CustomerPermissionsState;
    loadStatus: LoadStatus;
    loading: boolean;
    saving: boolean;
    loaded: boolean;
    users: (CustomerUser & Selectable & Editable)[];
    userSort: SortProps<CustomerUser>;
    returnToPath: string | null;
}

export const initialCustomerState = (): CustomerState => ({
    company: 'chums',
    key: null,
    account: null,
    shipToCode: null,
    shipTo: null,
    contacts: [],
    pricing: [],
    shipToAddresses: [],
    paymentCards: [],
    permissions: {
        values: null,
        loading: false,
        loaded: false,
    },
    loadStatus: 'idle',
    loading: false,
    loaded: false,
    saving: false,
    users: [],
    userSort: {field: 'name', ascending: true},
    returnToPath: null,
});

const customerReducer = createReducer(initialCustomerState, builder => {
    builder
        .addCase(saveUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(saveUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = [...action.payload].sort(customerUserSorter(defaultCustomerUserSort));
        })
        .addCase(saveUser.rejected, (state) => {
            state.loading = false;
        })
        .addCase(removeUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(removeUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = [...action.payload].sort(customerUserSorter(defaultCustomerUserSort));
        })
        .addCase(removeUser.rejected, (state) => {
            state.loading = false;
        })
        .addCase(setCustomerAccount.fulfilled, (state, action) => {
            state.company = companyCode('chums');
            if (!!state.account && (
                state.account.ARDivisionNo !== action.payload.customer.ARDivisionNo
                || state.account.CustomerNo !== action.payload.customer.CustomerNo
                || (state.account.ShipToCode ?? '') !== (action.payload.customer.ShipToCode ?? '')
            )) {
                state.contacts = [];
                state.pricing = [];
                state.shipToAddresses = [];
                state.paymentCards = [];
                state.users = [];
            }
            state.account = {...emptyCustomer, ...action.payload.customer};
        })
        .addCase(setLoggedIn, (state, action) => {
            if (!action.payload?.loggedIn) {
                const initialState = initialCustomerState();
                state.key = initialState.key;
                state.account = initialState.account;
                state.contacts = initialState.contacts;
                state.pricing = initialState.pricing;
                state.shipToAddresses = initialState.shipToAddresses;
                state.paymentCards = initialState.paymentCards;
                state.permissions = initialState.permissions;
                state.users = initialState.users;
                state.loaded = false;
            }
        })
        .addCase(saveBillingAddress.pending, (state) => {
            state.loading = true;
        })
        .addCase(saveBillingAddress.fulfilled, (state, action) => {
            state.loadStatus = 'idle';
            state.loading = false;
            const {
                account,
                shipToCode,
                permissions,
                contacts,
                pricing,
                shipToAddresses,
                paymentCards,
                users
            } = customerResponseToState(action.payload, state);
            state.account = account ?? null;
            state.shipToCode = shipToCode ?? null;
            state.permissions.values = permissions?.values ?? null;
            state.contacts = contacts ?? [];
            state.pricing = pricing ?? [];
            state.shipToAddresses = (shipToAddresses ?? []).sort(customerShipToSorter(defaultShipToSort));
            state.paymentCards = paymentCards ?? [];
            state.users = (users ?? []).sort(customerUserSorter(defaultCustomerUserSort));
            state.loaded = true;
        })
        .addCase(saveBillingAddress.rejected, (state) => {
            state.loading = false;
            state.loadStatus = 'idle';
        })
        .addCase(saveShipToAddress.pending, (state) => {
            state.loading = true;
            state.loadStatus = 'pending';
        })
        .addCase(saveShipToAddress.fulfilled, (state, action) => {
            state.loading = false;
            state.loadStatus = 'idle';
            const {
                account,
                shipToCode,
                permissions,
                contacts,
                pricing,
                shipToAddresses,
                paymentCards,
                users
            } = customerResponseToState(action.payload, state);
            state.account = account ?? null;
            state.shipToCode = shipToCode ?? null;
            state.permissions.values = permissions?.values ?? null;
            state.contacts = contacts ?? [];
            state.pricing = pricing ?? [];
            state.shipToAddresses = (shipToAddresses ?? []).sort(customerShipToSorter(defaultShipToSort));
            state.paymentCards = paymentCards ?? [];
            state.users = (users ?? []).sort(customerUserSorter(defaultCustomerUserSort));
            state.loaded = true;

        })
        .addCase(saveShipToAddress.rejected, (state) => {
            state.loading = false;
        })
        .addCase(setDefaultShipTo.pending, (state) => {
            state.loading = true;
        })
        .addCase(setDefaultShipTo.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(setDefaultShipTo.rejected, (state) => {
            state.loading = false;
        })
        .addCase(loadCustomer.pending, (state, action) => {
            state.loadStatus = 'pending';
            if (state.key !== customerSlug(action.meta.arg)) {
                state.account = null;
                state.shipToCode = null;
                state.contacts = [];
                state.pricing = [];
                state.shipToAddresses = [];
                state.paymentCards = [];
                state.users = [];
                state.permissions.values = null;
                state.loaded = false;
            }
            state.key = customerSlug(action.meta.arg);
            state.loading = true;
        })
        .addCase(loadCustomer.fulfilled, (state, action) => {
            state.loadStatus = 'idle';
            state.loading = false;
            const {
                account,
                shipToCode,
                permissions,
                contacts,
                pricing,
                shipToAddresses,
                paymentCards,
                users
            } = customerResponseToState(action.payload, state);
            state.account = account ?? null;
            state.shipToCode = shipToCode ?? null;
            state.permissions.values = permissions?.values ?? null;
            state.contacts = contacts ?? [];
            state.pricing = pricing ?? [];
            state.shipToAddresses = (shipToAddresses ?? []).sort(customerShipToSorter(defaultShipToSort));
            state.paymentCards = paymentCards ?? [];
            state.users = (users ?? []).sort(customerUserSorter(defaultCustomerUserSort));
            state.loaded = true;
        })
        .addCase(loadCustomer.rejected, (state) => {
            state.loadStatus = 'rejected';
            state.loading = false;
        })
        .addCase(dismissContextAlert, (state, action) => {
            if (action.payload === loadCustomer.typePrefix) {
                state.loadStatus = 'idle';
            }
        })
        .addCase(setUserAccess.pending, (state, action) => {
            if (!action.meta.arg?.isRepAccount && customerSlug(state.account) !== customerSlug(action.meta.arg)) {
                state.account = null;
                state.contacts = [];
                state.pricing = [];
                state.shipToAddresses = [];
                state.paymentCards = [];
                state.users = [];
                state.permissions.values = null;
                state.loaded = true;
            }
        })
        .addCase(loadCustomerPermissions.pending, (state, action) => {
            state.permissions.loading = true;
            const key = customerSlug(action.meta.arg)
            if (key !== state.key) {
                state.permissions.loaded = false;
                state.permissions.values = null;

            }
        })
        .addCase(loadCustomerPermissions.fulfilled, (state, action) => {
            state.permissions.loading = false;
            state.permissions.loaded = true;
            state.permissions.values = action.payload ?? null;
        })
        .addCase(loadCustomerPermissions.rejected, (state) => {
            state.permissions.loading = false;
        })
        .addCase(setReturnToPath, (state, action) => {
            state.returnToPath = action.payload;
        })
        .addCase(loadCustomerList.fulfilled, (state, action) => {
            if (state.account) {
                const [customer] = action.payload.filter(customer => customerSlug(customer) === customerSlug(state.account));
                if (!customer) {
                    state.account = null;
                    state.contacts = [];
                    state.pricing = [];
                    state.shipToAddresses = [];
                    state.paymentCards = [];
                    state.users = [];
                    state.permissions.values = null;
                    state.loaded = true;
                }
            }
        })
        .addCase(loadCustomerUsers.pending, (state) => {
            state.loading = true;
        })
        .addCase(loadCustomerUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload.sort(customerUserSorter(defaultCustomerUserSort))
        })
        .addCase(loadCustomerUsers.rejected, (state) => {
            state.loading = false;
        })
        .addCase(setShipToCode, (state, action) => {
            state.shipToCode = action.payload;
        })
        .addCase(setCustomerUserSort, (state, action) => {
            state.userSort = action.payload;
        })
})

export default customerReducer;
