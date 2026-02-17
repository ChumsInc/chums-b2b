import type {BillToCustomer} from "chums-types/b2b";
import Typography from "@mui/material/Typography";

export interface BillingCustomerAddressTitleProps {
    customer: BillToCustomer
}

export default function BillingCustomerAddressTitle({customer}: BillingCustomerAddressTitleProps) {
    return (
        <Typography variant="h3" component="h3">
            {customer.ParentCustomerNo && (
                <span>Sold-To Contact &amp; Address</span>
            )}
            {!customer.ParentCustomerNo && (
                <span>Billing Contact &amp; Address</span>
            )}
        </Typography>
    )
}
