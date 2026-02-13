import {billToCustomerSlug, buildRecentCustomers, customerSlug} from "@/utils/customer";
import localStore from "../../utils/LocalStore";
import {STORE_CUSTOMER, STORE_RECENT_ACCOUNTS} from "@/constants/stores";
import {selectLoggedIn} from "../user/userProfileSlice";
import {selectCustomerAccount, selectCustomerKey, selectCustomerLoadStatus} from "./currentCustomerSlice";
import {
    deleteCustomerUser,
    fetchCustomerAccount,
    fetchCustomerUsers,
    fetchCustomerValidation,
    postBillingAddress,
    postCustomerUser,
    postDefaultShipToCode,
    postShipToAddress
} from "@/api/customer";
import type {
    BasicCustomer,
    BillToCustomer,
    CustomerKey,
    CustomerUser,
    RecentCustomer,
    ShipToCustomer
} from "chums-types/b2b";
import type {RootState} from "@/app/configureStore";
import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import type {FetchCustomerResponse} from "./types";
import {loadOpenOrders} from "../open-orders/actions";
import type {CustomerPermissions} from "@/types/customer";
import {selectRecentCustomers} from "../customers/recentCustomersSlice";
import {loadCarts} from "@/ducks/carts/actions";
import {canStorePreferences} from "@/ducks/cookie-consent/utils";
import {selectCustomerPermissionsStatus} from "@/ducks/customer/customerPermissionsSlice";

export const setReturnToPath = createAction<string | null>('customer/setReturnTo');
export const setShipToCode = createAction<string | null>('customer/setShipToCode');

export const saveUser = createAsyncThunk<CustomerUser[], CustomerUser, { state: RootState }>(
    'customer/saveUser',
    async (arg, {getState}) => {
        const state = getState();
        const customer = selectCustomerKey(state);
        return await postCustomerUser(arg, customer!);
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectLoggedIn(state) && selectCustomerLoadStatus(state) === 'idle' && !!selectCustomerAccount(state);
        }
    }
)

export const removeUser = createAsyncThunk<CustomerUser[], CustomerUser, { state: RootState }>(
    'customer/removeUser',
    async (arg, {getState}) => {
        const state = getState();
        const customer = selectCustomerAccount(state) as CustomerKey;
        return await deleteCustomerUser(arg, customer);
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectLoggedIn(state) && selectCustomerLoadStatus(state) === 'idle' && !!selectCustomerAccount(state);
        }
    }
)

export const setCustomerAccount = createAsyncThunk<{
    customer: BasicCustomer,
    recent: RecentCustomer[]
}, BasicCustomer, { state: RootState }>(
    'customer/setCurrent',
    async (arg, {getState}) => {
        const state = getState();
        const recentAccounts = buildRecentCustomers(selectRecentCustomers(state), arg);
        if (canStorePreferences()) {
            localStore.setItem(STORE_RECENT_ACCOUNTS, recentAccounts);
        }
        return {customer: arg, recent: recentAccounts};
    }, {
        condition: (arg, {getState}) => {
            const state = getState();
            const customer = selectCustomerAccount(state);
            return selectLoggedIn(state) && (!customer || customerSlug(customer) !== customerSlug(arg));
        }
    })

export const loadCustomer = createAsyncThunk<FetchCustomerResponse | null, CustomerKey | null, { state: RootState }>(
    'customer/load',
    async (arg, {dispatch, getState}) => {
        const response = await fetchCustomerAccount(arg!);
        const customerKey = billToCustomerSlug(response.customer);
        if (customerKey) {
            dispatch(loadOpenOrders(customerKey));
            dispatch(loadCarts(customerKey));
        }
        const state = getState();
        response.recent = buildRecentCustomers(selectRecentCustomers(state), response.customer);
        if (canStorePreferences()) {
            localStore.setItem(STORE_RECENT_ACCOUNTS, response.recent);
        }
        const {ARDivisionNo, CustomerNo, CustomerName, ShipToCode} = response.customer;
        localStore.setItem<BasicCustomer>(STORE_CUSTOMER, {
            ARDivisionNo,
            CustomerNo,
            CustomerName,
            ShipToCode
        });
        return response;
    }, {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectLoggedIn(state) && !!arg && selectCustomerLoadStatus(state) === 'idle';
        }
    }
)


export const saveBillingAddress = createAsyncThunk<FetchCustomerResponse | null, BillToCustomer, { state: RootState }>(
    'customer/saveBillingAddress',
    async (arg) => {
        return await postBillingAddress(arg);
    }, {
        condition: (_, {getState}) => {
            const state = getState();
            return selectLoggedIn(state) && selectCustomerLoadStatus(state) === 'idle';
        }
    }
)


export const maxShipToLength = 4;
export const saveShipToAddress = createAsyncThunk<FetchCustomerResponse | null, ShipToCustomer, { state: RootState }>(
    'customer/saveShipToAddress',
    async (arg) => {
        return await postShipToAddress(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectLoggedIn(state)
                && !!arg.ShipToCode && arg.ShipToCode.length <= maxShipToLength
                && selectCustomerLoadStatus(state) === 'idle';
        }
    }
)

export const setDefaultShipTo = createAsyncThunk<void, string, { state: RootState }>(
    'customer/setDefaultShipTo',
    async (arg, {getState}) => {
        const state = getState();
        const customer = selectCustomerAccount(state) as CustomerKey;
        await postDefaultShipToCode(arg, customer);
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectLoggedIn(state) && selectCustomerLoadStatus(state) === 'idle';
        }
    }
)

export const loadCustomerPermissions = createAsyncThunk<CustomerPermissions | null, CustomerKey | null, {
    state: RootState
}>(
    'customer/values/load',
    async (arg) => {
        return await fetchCustomerValidation(arg!);
    }, {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectLoggedIn(state) && !!arg && selectCustomerPermissionsStatus(state) === 'idle' && !!selectCustomerAccount(state);
        }
    }
)

export const loadCustomerUsers = createAsyncThunk<CustomerUser[], void, { state: RootState }>(
    'customer/users/load',
    async (_, {getState}) => {
        const state = getState();
        const customerKey = selectCustomerKey(state);
        return await fetchCustomerUsers(customerKey!);
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectLoggedIn(state) && selectCustomerLoadStatus(state) === 'idle' && !!selectCustomerKey(state);
        }
    }
)
