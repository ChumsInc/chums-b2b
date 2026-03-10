import type {Customer, RecentCustomer} from "chums-types/b2b";
import type {SortProps} from "@/types/generic";

export interface CustomersState {
    key: number | null;
    list: ListedCustomer[];
    loading: 'idle' | 'loading' | 'rejected';
    loaded: boolean;
    error: null | string;
    filters: {
        search: string;
        rep: string;
        state: string;
    }
    sort: SortProps<ListedCustomer>;
    recent: RecentCustomer[];
}

export type ListedCustomer = Pick<Customer, 'ARDivisionNo'|'CustomerNo'|'ShipToCode'|'CustomerName'
    |'AddressLine1'|'City'|'State'|'ZipCode'|'CountryCode'|'TelephoneNo'|'EmailAddress'
    |'SalespersonDivisionNo'|'SalespersonNo'|'BillToName'>

export type ListedCustomerAddress = Pick<ListedCustomer, 'CustomerName'|'AddressLine1'|'City'|'State'|'ZipCode'|'CountryCode'>
