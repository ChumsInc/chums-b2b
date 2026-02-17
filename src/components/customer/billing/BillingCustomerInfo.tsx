import type {BillToCustomer} from "chums-types/b2b";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Address from "@/components/address/Address.tsx";

export interface BillingCustomerInfoProps {
    customer: BillToCustomer;
}
export default function BillingCustomerInfo({customer}:BillingCustomerInfoProps) {
    if (!customer.ParentCustomerNo) {
        return null
    }
    return (
        <>
            <Typography variant="subtitle1" component="h3">
                Billing Customer
            </Typography>
            <Box sx={{mb: 1}}>
                <Typography variant="h5" sx={{
                    display: 'inline',
                    mr: 3
                }}>{customer.ParentDivisionNo}-{customer.ParentCustomerNo}</Typography>
                <Typography variant="h5" sx={{
                    display: 'inline',
                    fontWeight: 300
                }}>{customer.ParentCustomerName}</Typography>
            </Box>
            <Address address={{
                CustomerName: '',
                AddressLine1: customer.ParentAddressLine1 ?? '',
                AddressLine2: customer.ParentAddressLine2 ?? '',
                AddressLine3: customer.ParentAddressLine3 ?? '',
                City: customer.ParentCity ?? '',
                State: customer.ParentState ?? '',
                ZipCode: customer.ParentZipCode ?? '',
                CountryCode: customer.ParentCountryCode ?? '',
            }}/>
        </>
    )
}
