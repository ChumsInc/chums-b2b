import Alert from "@mui/material/Alert";

export interface NoInvoicesAlertProps {
    paid?: boolean;
}
export default function NoInvoicesAlert({paid}:NoInvoicesAlertProps) {
    return (
        <Alert variant="outlined" color="info" sx={{mt: 3}}>
            {paid ? 'No invoices' : 'No unpaid invoices'}
        </Alert>
    )
}
