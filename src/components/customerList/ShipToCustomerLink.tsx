import type {SalesOrderHeader} from "chums-types/b2b";
import CustomerLink from "@/components/customerList/CustomerLink.tsx";
import {useAppSelector} from "@/app/hooks.ts";
import {selectCustomerAccount} from "@/ducks/customer/currentCustomerSlice.ts";

export interface ShipToCustomerLinkProps {
    salesOrder: SalesOrderHeader
}

export default function ShipToCustomerLink({salesOrder}: ShipToCustomerLinkProps) {
    const currentCustomer = useAppSelector(selectCustomerAccount);
    if (salesOrder.BillToDivisionNo === currentCustomer?.ARDivisionNo && salesOrder.BillToCustomerNo === currentCustomer?.CustomerNo) {
        return (
            <CustomerLink customer={salesOrder}/>
        )
    }
    if (salesOrder.ShipToCode) {
        return `${salesOrder.ARDivisionNo}-${salesOrder.CustomerNo}/${salesOrder.ShipToCode}`;
    }
    return `${salesOrder.ARDivisionNo}-${salesOrder.CustomerNo}`;
}
