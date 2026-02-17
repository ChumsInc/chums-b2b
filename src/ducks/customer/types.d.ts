import {
    BillToCustomer,
    CustomerContact,
    CustomerPaymentCard,
    CustomerPriceRecord,
    CustomerUser, type Editable,
    PromoCode, RecentCustomer,
    ShipToCustomer, type SortProps
} from "chums-types/b2b";
import {CustomerPermissions} from "../../ducks/user/types";
import type {LoadStatus} from "@/types/generic";

export interface FetchCustomerResponse {
    contacts: CustomerContact[];
    customer: BillToCustomer;
    pricing: CustomerPriceRecord[];
    shipTo: ShipToCustomer[];
    users: CustomerUser[];
    paymentCards: CustomerPaymentCard[];
    promoCodes: PromoCode[];
    permissions: CustomerPermissions | null;
    recent?: RecentCustomer[];
}

export interface CustomerState {
    company: string;
    key: string | null;
    account: (BillToCustomer & Editable) | null;
    shipToCode: string | null;
    shipTo: ShipToCustomer | null;
    contacts: CustomerContact[];
    shipToAddresses: (ShipToCustomer & Editable)[];
    loadStatus: LoadStatus;
    loading: boolean;
    saving: boolean;
    loaded: boolean;
    userSort: SortProps<CustomerUser>;
    returnToPath: string | null;
}
