import type {CustomersState} from "@/ducks/customers/types.ts";
import {auth} from "@/api/IntranetAuthService.ts";
import localStore from "@/utils/LocalStore.ts";
import type {RecentCustomer} from "b2b-types";
import {STORE_CUSTOMERS_FILTER_REP, STORE_CUSTOMERS_FILTER_STATE, STORE_RECENT_ACCOUNTS} from "@/constants/stores.ts";

export const initialCustomersState = (): CustomersState => {
    const isLoggedIn = auth.loggedIn();
    const recentCustomers = isLoggedIn
        ? localStore.getItem<RecentCustomer[]>(STORE_RECENT_ACCOUNTS, [])
        : [];

    return {
        key: null,
        list: [],
        loading: 'idle',
        loaded: false,
        error: null,
        filters: {
            search: '',
            rep: localStore.getItem<string>(STORE_CUSTOMERS_FILTER_REP, '') ?? '',
            state: localStore.getItem<string>(STORE_CUSTOMERS_FILTER_STATE, '') ?? '',
        },
        sort: {field: 'CustomerName', ascending: true},
        recent: recentCustomers,
    }
}
