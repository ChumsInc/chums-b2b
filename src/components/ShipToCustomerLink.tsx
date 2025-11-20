import type {SalesOrderHeader} from "chums-types/b2b";
import CustomerLink from "@/components/CustomerLink";
import {useAppSelector} from "@/app/hooks";
import {selectCustomerAccount} from "@/ducks/customer/currentCustomerSlice";

export interface ShipToCustomerLinkProps {
    salesOrder: SalesOrderHeader
}

export default function ShipToCustomerLink({salesOrder}: ShipToCustomerLinkProps) {
    const currentCustomer = useAppSelector(selectCustomerAccount);
    if (salesOrder.BillToDivisionNo == currentCustomer?.ARDivisionNo && salesOrder.BillToCustomerNo === currentCustomer?.CustomerNo) {
        return (
            <CustomerLink customer={salesOrder}/>
        )
    }
    if (salesOrder.ShipToCode) {
        return `${salesOrder.ARDivisionNo}-${salesOrder.CustomerNo}/${salesOrder.ShipToCode}`;
    }
    return `${salesOrder.ARDivisionNo}-${salesOrder.CustomerNo}`;
}
