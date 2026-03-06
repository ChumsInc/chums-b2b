import type {BillToCustomer, CustomerKey, ShipToCustomer} from "chums-types/b2b";
import type {CustomerPermissions} from "@/types/customer.ts";
import type {CurrentCustomerState} from "@/ducks/customer/currentCustomerSlice.ts";
import {createContext} from "react";

export interface CustomerContextState {
    customerKey: string|null;
    customer: BillToCustomer|null;
    shipTo: ShipToCustomer|null;
    permissions: CustomerPermissions|null;
    status: CurrentCustomerState['status'];
    setCustomerKey: (arg: CustomerKey|string|null) => void;
    reloadCustomer: () => void;
}

export const CustomerContext = createContext<CustomerContextState|null>(null);
