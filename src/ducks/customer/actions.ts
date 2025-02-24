import {billToCustomerSlug, buildRecentCustomers, customerSlug} from "@utils/customer";
import localStore from "../../utils/LocalStore";
import {STORE_CUSTOMER, STORE_RECENT_ACCOUNTS} from "@constants/stores";
import {selectCurrentCustomer, selectLoggedIn} from "../user/selectors";
import {
    selectCustomerAccount,
    selectCustomerKey,
    selectCustomerLoading,
    selectCustomerPermissionsLoading,
    selectCustomerSaving
} from "./selectors";
import {
    deleteCustomerUser,
    fetchCustomerAccount,
    fetchCustomerUsers,
    fetchCustomerValidation,
    postBillingAddress,
    postCustomerUser,
    postDefaultShipToCode,
    postShipToAddress
} from "@api/customer";
import {
    BasicCustomer,
    BillToCustomer,
    CustomerKey,
    CustomerUser,
    RecentCustomer,
    ShipToCustomer,
    SortProps
} from "b2b-types";
import {RootState} from "@app/configureStore";
import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {FetchCustomerResponse} from "./types";
import {loadOpenOrders} from "../open-orders/actions";
import {CustomerPermissions} from "@typeDefs/customer";
import {selectRecentCustomers} from "../customers/selectors";
import {loadCarts} from "@ducks/carts/actions";

export const setReturnToPath = createAction<string | null>('customer/setReturnTo');
export const setShipToCode = createAction<string | null>('customer/setShipToCode');
export const setCustomerUserSort = createAction<SortProps<CustomerUser>>('customer/setCustomerUserSort');

export const saveUser = createAsyncThunk<CustomerUser[], CustomerUser, { state: RootState }>(
    'customer/saveUser',
    async (arg, {getState}) => {
        const state = getState();
        const customer = selectCustomerKey(state);
        return await postCustomerUser(arg, customer!);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectLoggedIn(state) && !selectCustomerLoading(state) && !!selectCustomerAccount(state);
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
        condition: (arg, {getState}) => {
            const state = getState();
            return selectLoggedIn(state) && !selectCustomerLoading(state) && !!selectCustomerAccount(state);
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
        localStore.setItem(STORE_RECENT_ACCOUNTS, recentAccounts);
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
        localStore.setItem(STORE_RECENT_ACCOUNTS, response.recent);
        const {ARDivisionNo, CustomerNo, CustomerName, ShipToCode} = response.customer;
        const currentCustomer = selectCurrentCustomer(state);
        localStore.setItem<BasicCustomer>(STORE_CUSTOMER, {
            ...(currentCustomer ?? {}),
            ARDivisionNo,
            CustomerNo,
            CustomerName,
            ShipToCode
        });
        return response;
    }, {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectLoggedIn(state) && !!arg && !(selectCustomerLoading(state) || selectCustomerSaving(state));
        }
    }
)


export const saveBillingAddress = createAsyncThunk<FetchCustomerResponse | null, BillToCustomer, { state: RootState }>(
    'customer/saveBillingAddress',
    async (arg) => {
        return await postBillingAddress(arg);
    }, {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectLoggedIn(state) && !selectCustomerLoading(state);
        }
    }
)


export const saveShipToAddress = createAsyncThunk<FetchCustomerResponse | null, ShipToCustomer, { state: RootState }>(
    'customer/saveShipToAddress',
    async (arg) => {
        return await postShipToAddress(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectLoggedIn(state)
                && !!arg.ShipToCode && arg.ShipToCode.length <= 4
                && !selectCustomerLoading(state)
                ;
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
        condition: (arg, {getState}) => {
            const state = getState();
            return selectLoggedIn(state) && !selectCustomerLoading(state);
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
            return selectLoggedIn(state) && !!arg && !selectCustomerPermissionsLoading(state) && !!selectCustomerAccount(state);
        }
    }
)

export const loadCustomerUsers = createAsyncThunk<CustomerUser[], void, { state: RootState }>(
    'customer/users/load',
    async (arg, {getState}) => {
        const state = getState();
        const customerKey = selectCustomerKey(state);
        return await fetchCustomerUsers(customerKey!);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectLoggedIn(state) && !selectCustomerLoading(state) && !!selectCustomerKey(state);
        }
    }
)
