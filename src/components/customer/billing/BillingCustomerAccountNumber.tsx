import type {BillToCustomer} from "chums-types/b2b";
import TextField from "@mui/material/TextField";
import {longCustomerNo} from "@/utils/customer.ts";
import Grid from "@mui/material/Grid";

export interface BillingCustomerAccountNumberProps {
    customer:BillToCustomer;
}
export default function BillingCustomerAccountNumber({customer}:BillingCustomerAccountNumberProps) {
    return (
        <Grid size={{xs: 12, sm: 6}}>
            <TextField variant="filled" label="Account Number" fullWidth size="small"
                       type="text" value={longCustomerNo(customer) || ''}
                       slotProps={{
                           htmlInput: {readOnly: true}
                       }}/>
        </Grid>
    )
}
