import type {
    B2BCartHeader,
    BasicCustomer,
    BillToAddress,
    BillToCustomer,
    Customer,
    CustomerAddress,
    CustomerKey,
    ShipToAddress,
    ShipToCustomer,
    UserCustomerAccess
} from "chums-types/b2b";


export const addressFromShipToAddress = (address: B2BCartHeader | ShipToAddress | null): CustomerAddress => {
    return {
        CustomerName: address?.ShipToName ?? '',
        AddressLine1: address?.ShipToAddress1 ?? null,
        AddressLine2: address?.ShipToAddress2 ?? null,
        AddressLine3: address?.ShipToAddress3 ?? null,
        City: address?.ShipToCity ?? null,
        State: address?.ShipToState ?? null,
        CountryCode: address?.ShipToCountryCode ?? null,
        ZipCode: address?.ShipToZipCode ?? null
    }
}

export const addressFromBillToAddress = (address: BillToAddress | null): CustomerAddress => {
    return {
        CustomerName: address?.BillToName ?? '',
        AddressLine1: address?.BillToAddress1 ?? null,
        AddressLine2: address?.BillToAddress2 ?? null,
        AddressLine3: address?.BillToAddress3 ?? null,
        City: address?.BillToCity ?? null,
        State: address?.BillToState ?? null,
        CountryCode: address?.BillToCountryCode ?? null,
        ZipCode: address?.BillToZipCode ?? null
    }
}

export const multiLineAddress = (address: CustomerAddress, includeName?: boolean): string[] => {
    const finalLine = [address.City, address.State, address.CountryCode, address.ZipCode]
        .filter(val => !!val).join(' ');
    return [
        includeName ? address.CustomerName : '',
        address.AddressLine1 ?? '',
        address.AddressLine2 ?? '',
        address.AddressLine3 ?? '',
        finalLine
    ].filter(line => !!line);
}

export const filterShipToByUserAccount = (access: UserCustomerAccess | null) => (address: ShipToCustomer): boolean => {
    if (!access) {
        return false;
    }
    if (!access.isRepAccount) {
        return true;
    }
    return [address.SalespersonDivisionNo, '%'].includes(access.SalespersonDivisionNo)
        && [address.SalespersonNo, '%'].includes(access.SalespersonNo)
}

export const hasBillToAccess = (access: UserCustomerAccess | null, customerAccount: BillToCustomer | null) => {
    if (!access || !customerAccount) {
        return false;
    }
    if (access.isRepAccount) {
        return [customerAccount.SalespersonDivisionNo, '%'].includes(access.SalespersonDivisionNo)
            && [customerAccount.SalespersonNo, '%'].includes(access.SalespersonNo)
    }
    return access.ARDivisionNo === customerAccount.ARDivisionNo
        && access.CustomerNo === customerAccount.CustomerNo;
}

export function customerKey(arg: Customer | BasicCustomer | null): CustomerKey | null {
    if (!arg) {
        return null;
    }
    const {ARDivisionNo, CustomerNo, ShipToCode} = arg;
    return {
        ARDivisionNo,
        CustomerNo,
        ShipToCode
    }
}
