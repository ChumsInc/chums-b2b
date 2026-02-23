import Alert from "@mui/material/Alert";

export interface NoInvoicesAlertProps {
    hidePaid?: boolean;
}
export default function NoInvoicesAlert({hidePaid}:NoInvoicesAlertProps) {
    return (
        <Alert variant="outlined" color="info" sx={{mt: 3}}>
            {hidePaid ? 'No unpaid invoices' : 'No invoices'}
        </Alert>
    )
}
