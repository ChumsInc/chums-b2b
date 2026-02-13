import type {BillToCustomer} from "chums-types/b2b";
import BillingCustomerInfo from "@/components/customer/billing/BillingCustomerInfo.tsx";
import TextField from "@mui/material/TextField";
import {filteredTermsCode} from "@/constants/account.ts";
import Grid from "@mui/material/Grid";

export interface BillingCustomerPaymentTerms {
    customer:BillToCustomer;
}
export default function BillingCustomerPaymentTerms({customer}:BillingCustomerPaymentTerms) {
    return (
        <Grid size={{xs: 12, sm: 6}}>
            <BillingCustomerInfo customer={customer}/>
            {!customer.ParentCustomerNo && (
                <TextField variant="filled" label="Payment Terms" fullWidth size="small"
                           type="text" value={filteredTermsCode(customer.TermsCode)?.description ?? customer.TermsCode ?? ''}
                           slotProps={{
                               htmlInput: {readOnly: true}
                           }}
                />
            )}
        </Grid>
    )
}
