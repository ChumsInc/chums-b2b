import {generatePath, Link as RoutedLink} from 'react-router';
import type {OrderType} from "@/types/salesorder.ts";
import {customerSlug} from "@/utils/customer.ts";
import Link from "@mui/material/Link";
import {useAppSelector} from "@/app/hooks.ts";
import {selectCustomerKey} from "@/ducks/customer/currentCustomerSlice.ts";

const getSalesOrderPath = (orderType: OrderType | null): string => {
    switch (orderType) {
        case 'cart':
            return '/account/:customerSlug/carts/:salesOrderNo';
        case 'past':
        case 'invoice':
            return `/account/:customerSlug/invoices`;
        default:
            return `/account/:customerSlug/orders/:salesOrderNo`;
    }
}

export const OrderLink = ({salesOrderNo, orderType}: {
    salesOrderNo: string | null;
    orderType: OrderType | null;
}) => {
    const customer = useAppSelector(selectCustomerKey);
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
