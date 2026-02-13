import {generatePath, Link as RoutedLink} from 'react-router';
import {PATH_CUSTOMER_ACCOUNT, PATH_CUSTOMER_DELIVERY} from "@/constants/paths.ts";
import {billToCustomerSlug, customerSlug, longCustomerNo} from "@/utils/customer.ts";
import type {BasicCustomer} from "chums-types/b2b";
import Link from "@mui/material/Link";

const CustomerLink = ({customer, selected = false}: {
    customer: BasicCustomer;
    selected?: boolean;
}) => {
    const slug = customerSlug(customer);
    if (!slug) {
        return null;
    }
    let path;
    if (customer.ShipToCode) {
        path = generatePath(PATH_CUSTOMER_DELIVERY, {
            customerSlug: encodeURIComponent(billToCustomerSlug(customer)!),
            code: encodeURIComponent(customer.ShipToCode)
        })
    } else {
        path = generatePath(PATH_CUSTOMER_ACCOUNT, {customerSlug: encodeURIComponent(slug)})
    }

    return (
        <Link component={RoutedLink} to={path} sx={{whiteSpace: 'nowrap'}} color={selected ? 'chumsRed' : undefined} aria-label={`Select '${customer.CustomerName}'`}>
            {longCustomerNo(customer)}
        </Link>
    )
};

export default CustomerLink;
