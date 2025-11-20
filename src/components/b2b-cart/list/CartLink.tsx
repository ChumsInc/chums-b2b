import {type ReactNode} from 'react';
import {generatePath, Link as RoutedLink} from 'react-router';
import Link from "@mui/material/Link";
import {useAppSelector} from "@/app/hooks";
import {selectCustomerKey} from "@/ducks/customer/currentCustomerSlice";

export const cartPath = '/account/:customerSlug/carts/:cartId';

export default function CartLink({cartId, children}: {
    cartId: number | string;
    children?: ReactNode;
}) {
    const customer = useAppSelector(selectCustomerKey);
    if (!customer || !cartId) {
        return null;
    }

    const path = generatePath(cartPath, {
        customerSlug: customer,
        cartId: `${cartId}`,
    })
    return (<Link component={RoutedLink} to={path}>{children ?? cartId}</Link>)
};
