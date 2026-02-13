import type {BillToCustomer, UserRole} from "chums-types/b2b";
import type {APIErrorResponse} from "@/types/generic";


export function isBillToCustomer(customer: BillToCustomer | null): customer is BillToCustomer {
    if (!customer) {
        return false;
    }
    return (customer as BillToCustomer).ARDivisionNo !== undefined;
}


export const isUserRole = (role: string | UserRole): role is UserRole => {
    return (role as UserRole).role !== undefined;
}

export function isErrorResponse<T = unknown>(res: T | APIErrorResponse | null): res is APIErrorResponse {
    if (!res) {
        return false;
    }
    return (res as APIErrorResponse)?.error !== undefined;
}
