import {RootState} from "@app/configureStore";
import {createSelector} from "@reduxjs/toolkit";
import {customerListSorter, shortCustomerKey} from "@utils/customer";
import {STATES_USA} from "@constants/states";

export const selectCustomerList = (state: RootState) => state.customers.list;
export const selectCustomersLoading = (state: RootState) => state.customers.loading;
export const selectCustomersLoaded = (state: RootState) => state.customers.loaded;
export const selectCustomersLoadError = (state:RootState) => state.customers.error;
export const selectCustomersRepFilter = (state: RootState) => state.customers.filters.rep;
export const selectCustomersStateFilter = (state: RootState) => state.customers.filters.state;
export const selectCustomersFilter = (state: RootState) => state.customers.filters.search;
export const selectCustomerSort = (state: RootState) => state.customers.sort;
export const selectRecentCustomers = (state: RootState) => state.customers.recent;

export const selectFilteredCustomerList = createSelector(
    [selectCustomerList, selectCustomersFilter, selectCustomersRepFilter, selectCustomersStateFilter, selectCustomerSort],
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
