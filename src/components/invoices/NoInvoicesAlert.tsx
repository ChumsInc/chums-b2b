import Alert from "@mui/material/Alert";
import {useAppSelector} from "@/app/hooks.ts";
import {selectInvoicesHidePaid} from "@/ducks/invoices/invoiceListSlice.ts";

export default function NoInvoicesAlert() {
    const hidePaid = useAppSelector(selectInvoicesHidePaid);
    return (
        <Alert variant="outlined" color="info" sx={{mt: 3}}>
            {hidePaid ? 'No unpaid invoices' : 'No invoices'}
        </Alert>
    )
}
