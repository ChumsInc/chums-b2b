import type {Customer, RecentCustomer} from "b2b-types";
import type {SortProps} from "@/types/generic";

export interface CustomersState {
    key: number | null;
    list: Customer[];
    loading: 'idle' | 'loading' | 'rejected';
    loaded: boolean;
    error: null | string;
    filters: {
        search: string;
        rep: string;
        state: string;
    }
    sort: SortProps<Customer>;
    recent: RecentCustomer[];
}
