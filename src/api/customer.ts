
import {BillToCustomer, CustomerKey, CustomerUser, ShipToCustomer} from "b2b-types";
import {FetchCustomerResponse} from "@/ducks/customer/types";
import {fetchJSON} from "./fetch";
import {customerSlug, sageCompanyCode} from "@/utils/customer";
import {CustomerPermissions} from "../types/customer";



export async function fetchCustomerAccount({ARDivisionNo, CustomerNo}: CustomerKey): Promise<FetchCustomerResponse> {
    try {
        const url = '/api/sales/b2b/account/:customerSlug/customer.json'
            .replace(':customerSlug', customerSlug({ARDivisionNo, CustomerNo})!)
        const response = await fetchJSON<{ result: FetchCustomerResponse }>(url, {cache: 'no-cache'});
        if (!response.result || !response.result.customer || !response.result.customer.CustomerNo) {
            return Promise.reject(new Error('Invalid response when loading customer account'));
        }
        response.result.permissions = await fetchCustomerValidation({ARDivisionNo, CustomerNo});
        return response.result;
    } catch (err) {
        if (err instanceof Error) {
            console.debug(fetchCustomerAccount.name, err.message);
            return Promise.reject(err);
        }
        console.debug(fetchCustomerAccount.name, err);
        return Promise.reject(new Error(`Error in ${fetchCustomerAccount.name}`));
    }
}

export async function fetchCustomerUsers(customerKey:string):Promise<CustomerUser[]> {
    try {
        const url = '/api/user/v2/b2b/:customerKey/users.json'
            .replace(':customerKey', encodeURIComponent(customerKey));
        const response = await fetchJSON<{ users: CustomerUser[] }>(url, {cache: 'no-cache'});
        return response?.users ?? [];
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug(fetchCustomerUsers.name, err.message);
            return Promise.reject(err);
        }
        console.debug(fetchCustomerUsers.name, err);
        return Promise.reject(new Error(`Error in ${fetchCustomerUsers.name}`));
    }
}

export async function postAddCustomerUserLocation(arg:CustomerUser, customerKey:string): Promise<CustomerUser[]> {
    try {
        if (!arg.shipToCode?.[0]) {
            return Promise.reject(new Error('Invalid Ship-To code'));
        }
        const url = '/api/user/v2/b2b/:customerKey/users.json'
            .replace(':customerKey', customerKey)
        const method = 'POST';
        const body = JSON.stringify(arg);
        const response = await fetchJSON<{ users: CustomerUser[] }>(url, {method, body});
        return response.users ?? [];
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("postAddCustomerUserLocation()", err.message);
            return Promise.reject(err);
        }
        console.debug("postAddCustomerUserLocation()", err);
        return Promise.reject(new Error('Error in postAddCustomerUserLocation()'));
    }
}

export async function postCustomerUser(arg: CustomerUser, customerKey: string): Promise<CustomerUser[]> {
    try {
        if (arg.id && arg.shipToCode?.length === 1) {
            // in this case we are adding a ship-to location to an existing user.
            return await postAddCustomerUserLocation(arg, customerKey);
        }
        const urlBase = arg.id
            ? '/api/user/v2/b2b/:customerKey/users/:id.json'
            : '/api/user/v2/b2b/:customerKey/users.json';
        const _customerKey = customerKey + (arg.shipToCode?.length ? `-${arg.shipToCode[0]}` : '');
        const url = urlBase
            .replace(':customerKey', encodeURIComponent(_customerKey))
            .replace(':id', encodeURIComponent(arg.id))
        const method = arg.id ? 'PUT' : 'POST';
        const body = JSON.stringify(arg);
        const response = await fetchJSON<{ users: CustomerUser[] }>(url, {method, body});
        return response.users ?? [];
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("postCustomerUser()", err.message);
            return Promise.reject(err);
        }
        console.debug("postCustomerUser()", err);
        return Promise.reject(new Error('Error in postCustomerUser()'));
    }
}

export async function deleteCustomerUser(arg: CustomerUser, customer: CustomerKey): Promise<CustomerUser[]> {
    try {
        const customerKey = `${customer.ARDivisionNo}-${customer.CustomerNo}`;
        const url = '/api/user/v2/b2b/:customerKey/users/:id.json'
            .replace(':customerKey', encodeURIComponent(customerKey))
            .replace(':id', encodeURIComponent(arg.id));
        const response = await fetchJSON<{ users: CustomerUser[] }>(url, {method: 'delete'});
        return response.users ?? [];
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("deleteCustomerUser()", err.message);
            return Promise.reject(err);
        }
        console.debug("deleteCustomerUser()", err);
        return Promise.reject(new Error('Error in deleteCustomerUser()'));
    }
}

export async function postBillingAddress(arg: BillToCustomer): Promise<FetchCustomerResponse|null> {
    try {
        const {
            ARDivisionNo, CustomerNo, CustomerName, AddressLine1, AddressLine2, AddressLine3,
            City, State, ZipCode, CountryCode, EmailAddress, Reseller, TelephoneNo, TelephoneExt
        } = arg;
        const params = new URLSearchParams();
        params.set('co', sageCompanyCode('CHI'));
        params.set('account', `${ARDivisionNo}-${CustomerNo}`);
        const body = JSON.stringify({
            Name: CustomerName,
            AddressLine1,
            AddressLine2,
            AddressLine3,
            City,
            State,
            ZipCode,
            CountryCode,
            EmailAddress,
            Reseller,
            TelephoneNo,
            TelephoneExt
        });
        const url = `/sage/b2b/billto.php?${params.toString()}`;
        await fetchJSON(url, {method: 'POST', body});
        return await fetchCustomerAccount(arg);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("postBillingAddress()", err.message);
            return Promise.reject(err);
        }
        console.debug("postBillingAddress()", err);
        return Promise.reject(new Error('Error in postBillingAddress()'));
    }
}

export async function postShipToAddress(arg: ShipToCustomer): Promise<FetchCustomerResponse|null> {
    try {
        const {
            ARDivisionNo, CustomerNo, ShipToCode, ShipToName, ShipToAddress1, ShipToAddress2 = '', ShipToAddress3 = '',
            ShipToCity, ShipToState, ShipToZipCode, ShipToCountryCode, TelephoneNo, TelephoneExt = '', EmailAddress,
            ContactCode = '', Reseller = 'N',
        } = arg;
        const params = new URLSearchParams({co: 'CHI', account: `${ARDivisionNo}-${CustomerNo}-${ShipToCode}`});
        const url = `/sage/b2b/shipto.php?${params.toString()}`;
        const body = JSON.stringify({
            Name: ShipToName,
            AddressLine1: ShipToAddress1,
            AddressLine2: ShipToAddress2,
            AddressLine3: ShipToAddress3,
            City: ShipToCity,
            State: ShipToState,
            ZipCode: ShipToZipCode,
            CountryCode: ShipToCountryCode,
            EmailAddress,
            TelephoneNo,
            TelephoneExt,
            Reseller,
            ContactCode,
        });
        await fetchJSON(url, {method: 'POST', body});
        return await fetchCustomerAccount(arg);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("postShipToAddress()", err.message);
            return Promise.reject(err);
        }
        console.debug("postShipToAddress()", err);
        return Promise.reject(new Error('Error in postShipToAddress()'));
    }
}

export async function postDefaultShipToCode(arg: string, customer: CustomerKey): Promise<void> {
    try {
        const {ARDivisionNo, CustomerNo} = customer;
        const url = '/sage/b2b/set-primary-shipto.php?co=CHI';
        const body = JSON.stringify({Company: 'chums', account: `${ARDivisionNo}-${CustomerNo}:${arg}`});
        await fetchJSON(url, {method: 'POST', body});
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("postDefaultShipToCode()", err.message);
            return Promise.reject(err);
        }
        console.debug("postDefaultShipToCode()", err);
        return Promise.reject(new Error('Error in postDefaultShipToCode()'));
    }
}

export async function fetchCustomerValidation({ARDivisionNo, CustomerNo}:{
    ARDivisionNo: string;
    CustomerNo: string;
}):Promise<CustomerPermissions|null> {
    try {
        const customerKey = `${encodeURIComponent(ARDivisionNo)}-${encodeURIComponent(CustomerNo)}`;
        const url = `/api/user/v2/b2b/validate/customer/:customerKey.json`
            .replace(':customerKey', customerKey);
        const response = await fetchJSON<CustomerPermissions>(url, {cache: 'no-cache'});
        return response ?? null;
    } catch(err) {
        if (err instanceof Error) {
            console.debug("fetchCustomerValidation()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchCustomerValidation()", err);
        return Promise.reject(new Error('Error in fetchCustomerValidation()'));
    }
}
