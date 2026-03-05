import {generatePath, Link as RoutedLink} from 'react-router';
import {PATH_CUSTOMER_ACCOUNT} from "@/constants/paths.ts";
import {customerSlug, longCustomerNo} from "@/utils/customer.ts";
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
    const path = generatePath(PATH_CUSTOMER_ACCOUNT, {customerSlug: encodeURIComponent(slug)})

    return (
        <Link component={RoutedLink} to={path} sx={{whiteSpace: 'nowrap'}} color={selected ? 'chumsRed' : undefined}
              aria-label={`Select '${customer.CustomerName}'`}>
            {longCustomerNo(customer)}
        </Link>
    )
};

export default CustomerLink;
