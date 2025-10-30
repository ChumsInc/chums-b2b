import {type ReactNode} from 'react';
import {generatePath, Link as RoutedLink} from 'react-router';
import {customerSlug} from "@/utils/customer.ts";
import Link from "@mui/material/Link";
import {useAppSelector} from "@/app/configureStore.ts";
import {selectCustomerKey} from "@/ducks/customer/selectors.ts";

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
        customerSlug: customerSlug(customer),
        cartId: `${cartId}`,
    })
    return (<Link component={RoutedLink} to={path}>{children ?? cartId}</Link>)
};
