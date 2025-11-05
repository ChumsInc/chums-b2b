import {createEntityAdapter, createSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Customer} from "chums-types/b2b";
import {customerListSorter, customerSlug, shortCustomerKey} from "@/utils/customer";
import type {SortProps} from "@/types/generic";
import LocalStore from "@/utils/LocalStore";
import {STORE_CUSTOMERS_FILTER_REP, STORE_CUSTOMERS_FILTER_STATE} from "@/constants/stores";
import {setLoggedIn, setUserAccess} from "@/ducks/user/actions";
import {loadCustomerList} from "@/ducks/customers/actions";
import {dismissContextAlert} from "@/ducks/alerts/alertsSlice";
import {STATES_USA} from "@/constants/states";

const adapter = createEntityAdapter<Customer, string>({
    selectId: (arg) => customerSlug(arg)!,
    sortComparer: (a, b) => customerSlug(a)!.localeCompare(customerSlug(b)!)
});
const selectors = adapter.getSelectors();

export interface CustomersState {
    accessKey: number | null;
    status: 'idle' | 'loading' | 'rejected' | 'fulfilled';
    filters: {
        search: string;
        rep: string;
        state: string;
    },
    countries: string[];
    states: string[];
    sort: SortProps<Customer>;
}

const extraState = (): CustomersState => ({
    accessKey: null,
    status: 'idle',
    filters: {
        search: '',
        rep: LocalStore.getItem<string>(STORE_CUSTOMERS_FILTER_REP, ''),
        state: LocalStore.getItem<string>(STORE_CUSTOMERS_FILTER_STATE, ''),
    },
    countries: [],
    states: [],
    sort: {field: 'CustomerName', ascending: true},
});

export function getPreloadCustomerState(extra?:Partial<CustomersState>) {
    return adapter.getInitialState({
        ...extraState(),
        ...(extra ?? {}),
    })
}

const customerListSlice = createSlice({
    name: 'customerList',
    initialState: adapter.getInitialState(extraState()),
    reducers: {
        setCustomersSort: (state, action: PayloadAction<SortProps<Customer>>) => {
            state.sort = action.payload;
        },
        setCustomersFilter: (state, action: PayloadAction<string>) => {
            state.filters.search = action.payload;
        },
        setCustomersRepFilter: (state, action: PayloadAction<string|null>) => {
            state.filters.rep = action.payload ?? '';
            LocalStore.setItem(STORE_CUSTOMERS_FILTER_REP, action.payload);
        },
        setCustomersStateFilter: (state, action: PayloadAction<string|null>) => {
            state.filters.state = action.payload ?? '';
            LocalStore.setItem(STORE_CUSTOMERS_FILTER_STATE, action.payload);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(setLoggedIn, (state, action) => {
                if (!action.payload.loggedIn) {
                    adapter.removeAll(state);
                    state.filters.search = '';
                    state.filters.rep = '';
                    state.filters.state = '';
                    state.accessKey = null;
                    if (state.status === 'fulfilled') {
                        state.status = 'idle';
                    }
                }
            })
            .addCase(loadCustomerList.pending, (state, action) => {
                state.status = 'loading';
                if (state.accessKey !== action.meta.arg?.id) {
                    state.accessKey = action.meta.arg?.id ?? null;
                    adapter.removeAll(state);
                }
            })
            .addCase(loadCustomerList.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                adapter.setAll(state, action.payload);
            })
            .addCase(loadCustomerList.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(dismissContextAlert, (state, action) => {
                if (action.payload === loadCustomerList.typePrefix) {
                    state.status = 'idle'
                }
            })
            .addCase(setUserAccess.pending, (state, action) => {
                if (state.accessKey !== action.meta.arg?.id) {
                    adapter.removeAll(state);
                    state.status = 'idle';
                    state.filters.rep = '';
                    state.filters.search = '';
                    state.filters.state = '';
                    state.accessKey = action.meta.arg?.id ?? null;
                }
            })
    },
    selectors: {
        selectCustomerList: (state) => selectors.selectAll(state),
        selectCustomersStatus: (state) => state.status,
        selectCustomersSearchFilter: (state) => state.filters.search,
        selectCustomersRepFilter: (state) => state.filters.rep,
        selectCustomersStateFilter: (state) => state.filters.state,
        selectCustomersSort: (state) => state.sort,
    }
})

export default customerListSlice;
export const {
    selectCustomerList,
    selectCustomersStatus,
    selectCustomersSearchFilter,
    selectCustomersRepFilter,
    selectCustomersStateFilter,
    selectCustomersSort
} = customerListSlice.selectors;
export const {
    setCustomersFilter,
    setCustomersRepFilter,
    setCustomersStateFilter,
    setCustomersSort,
} = customerListSlice.actions;


export const selectFilteredCustomerList = createSelector(
    [selectCustomerList, selectCustomersSearchFilter, selectCustomersRepFilter, selectCustomersStateFilter, selectCustomersSort],
    (list, filter, repFilter, stateFilter, sort) => {
        let filterRegex = /^/;
        try {
            filterRegex = new RegExp(`\\b${filter ?? ''}`, 'i');
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err: unknown) {
            filterRegex = /^/;
        }
        return list
            .filter(customer => !repFilter || customer.SalespersonNo === repFilter)
            .filter(customer => !stateFilter || customer.State === stateFilter)
            .filter(customer => {
                return !filter
                    || filterRegex.test(shortCustomerKey(customer))
                    || filterRegex.test(`${customer.ARDivisionNo}-${customer.CustomerNo}`)
                    || filterRegex.test(`${customer.ARDivisionNo}${customer.CustomerNo}`)
                    || filterRegex.test(customer.CustomerNo)
                    || filterRegex.test(customer.CustomerName)
                    || filterRegex.test(customer.BillToName ?? '')
                    || filterRegex.test(customer.AddressLine1 ?? '')
                    || filterRegex.test(customer.City ?? '')
                    || filterRegex.test(customer.State ?? '')
                    || filterRegex.test(customer.ZipCode ?? '')
                    || filterRegex.test(customer.TelephoneNo ?? '')
            })
            .sort(customerListSorter(sort));
    }
)

export const selectCustomerStates = createSelector(
    [selectCustomerList],
    (list) => {
        const states = list.reduce((pv: string[], cv) => {
            if (cv.CountryCode === 'USA' && cv.State && !pv.includes(cv.State)) {
                const [state] = STATES_USA.filter(state => state.code === cv.State)
                if (state) {
                    return [...pv, state.code];
                }
            }
            return pv;
        }, [] as string[]);
        return states.sort();
    }
)
