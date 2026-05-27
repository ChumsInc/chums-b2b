import Alert from "@mui/material/Alert";
import LockIcon from '@mui/icons-material/Lock';

export default function ContentSectionRequiresLogin() {
    return (
        <Alert severity="warning" variant="outlined"
               sx={{width: 'max-content', margin: 'auto'}}
               icon={<LockIcon fontSize="inherit"/>}>
            This section requires login.
        </Alert>
    )
}
