import Alert from "@mui/material/Alert";

export default function NoOpenInvoicesAlert() {
    return (
        <Alert variant="outlined" color="info" sx={{mt: 3}}>No open invoices</Alert>
    )
}
