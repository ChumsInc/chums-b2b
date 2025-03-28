import React from 'react';
import {SalesOrderHeader} from "b2b-types";
import CustomerLink from "@/components/CustomerLink";
import {selectCurrentCustomer} from "@/ducks/user/selectors";
import {useAppSelector} from "@/app/configureStore";

export interface ShipToCustomerLinkProps {
    salesOrder: SalesOrderHeader
}

export default function ShipToCustomerLink({salesOrder}: ShipToCustomerLinkProps) {
    const currentCustomer = useAppSelector(selectCurrentCustomer);
    if (salesOrder.BillToDivisionNo == currentCustomer?.ARDivisionNo && salesOrder.BillToCustomerNo === currentCustomer?.CustomerNo ) {
        return (
            <CustomerLink customer={salesOrder}/>
        )
    }
    if (salesOrder.ShipToCode) {
        return `${salesOrder.ARDivisionNo}-${salesOrder.CustomerNo}/${salesOrder.ShipToCode}`;
    }
    return `${salesOrder.ARDivisionNo}-${salesOrder.CustomerNo}`;
}
