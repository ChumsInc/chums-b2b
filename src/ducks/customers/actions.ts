import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {SortProps} from "@/types/generic";
import {Customer, UserCustomerAccess} from "b2b-types";
import {fetchCustomerList} from "@/api/customer-list";
import {RootState} from "@/app/configureStore";
import {selectLoggedIn} from "../user/selectors";
import {selectCustomersLoading} from "./selectors";
import localStore from "../../utils/LocalStore";
import {STORE_CUSTOMERS_FILTER_REP, STORE_CUSTOMERS_FILTER_STATE, STORE_RECENT_ACCOUNTS} from "@/constants/stores";
import {canStorePreferences} from "@/ducks/cookie-consent/utils";

export const setCustomersFilter = createAction<string>('customers/setFilter');
export const setCustomersRepFilter = createAction('customers/setRepFilter', (arg: string | null) => {
    if (canStorePreferences()) {
        localStore.setItem<string>(STORE_CUSTOMERS_FILTER_REP, arg ?? '');
    }
    return {
        payload: arg
    }
});
export const setCustomersStateFilter = createAction('customers/setStateFilter', (arg: string | null) => {
    if (canStorePreferences()) {
        localStore.setItem<string>(STORE_CUSTOMERS_FILTER_STATE, arg ?? '');
    }
    return {
        payload: arg
    }
});
export const setCustomersSort = createAction<SortProps<Customer>>('customers/setSort');

export const clearRecentCustomers = createAction('customers/clearRecentCustomers', () => {
    localStore.removeItem(STORE_RECENT_ACCOUNTS);
    return {payload: null}
});

export const loadCustomerList = createAsyncThunk<Customer[], UserCustomerAccess | null, { state: RootState }>(
    'customers/list/load',
    async (arg) => {
        return await fetchCustomerList(arg!)
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectLoggedIn(state)
                && !!arg?.isRepAccount
                && selectCustomersLoading(state) === 'idle';
        }
    }
)
