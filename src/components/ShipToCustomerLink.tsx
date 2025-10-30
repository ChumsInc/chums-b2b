import type {SalesOrderHeader} from "b2b-types";
import CustomerLink from "@/components/CustomerLink";
import {useAppSelector} from "@/app/configureStore";
import {selectCustomerAccount} from "@/ducks/customer/selectors.ts";

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
