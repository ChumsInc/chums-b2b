import type {Customer, UserCustomerAccess} from "chums-types/b2b";
import {fetchJSON} from "./fetch";

export const API_PATH_CUSTOMER_LIST = '/api/sales/b2b/account-list/:Company/:SalespersonDivisionNo-:SalespersonNo';

export async function fetchCustomerList(arg:UserCustomerAccess):Promise<Customer[]> {
    try {
        if (!arg.isRepAccount) {
            return [];
        }
        const url = '/api/sales/b2b/account-list/:Company/:SalespersonDivisionNo-:SalespersonNo'
            .replace(':Company', encodeURIComponent('chums'))
            .replace(':SalespersonDivisionNo', encodeURIComponent(arg.SalespersonDivisionNo))
            .replace(':SalespersonNo', encodeURIComponent(arg.SalespersonNo));
        const res = await fetchJSON<{result: Customer[]}>(url, {cache: 'no-cache'});
        return res?.result ?? [];
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchCustomerList()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchCustomerList()", err);
        return Promise.reject(new Error('Error in fetchCustomerList()'));
    }
}
