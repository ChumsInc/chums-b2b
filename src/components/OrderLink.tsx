import React from "react";
import {generatePath, Link as RoutedLink} from "react-router";
import {OrderType} from "@/types/salesorder";
import {selectCurrentCustomer} from "@/ducks/user/selectors";
import {customerSlug} from "@/utils/customer";
import Link from "@mui/material/Link";
import {useAppSelector} from "@/app/configureStore";

const getSalesOrderPath = (orderType: OrderType | null): string => {
    switch (orderType) {
        case 'cart':
            return '/account/:customerSlug/carts/:salesOrderNo';
        case 'past':
        case 'invoice':
            return `/account/:customerSlug/closed/:salesOrderNo`;
        default:
            return `/account/:customerSlug/orders/:salesOrderNo`;
    }
}

export const OrderLink = ({salesOrderNo, orderType}: {
    salesOrderNo: string | null;
    orderType: OrderType | null;
}) => {
    const customer = useAppSelector(selectCurrentCustomer);
    if (!customer || !salesOrderNo) {
        return null;
    }
    const basePath = getSalesOrderPath(orderType);
    const path = generatePath(basePath, {
        customerSlug: customerSlug(customer),
        salesOrderNo
    })
    return (<Link component={RoutedLink} to={path}>{salesOrderNo}</Link>)
};

export default OrderLink;
