import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";

export interface ContentRequiresLoginProps {
    keyword: string|null;
    title: string|null;
}
export default function ContentRequiresLogin({keyword, title}:ContentRequiresLoginProps) {
    return (
        <div className={`page-${keyword}`}>
            <Typography component="h1" variant="h1">{title}</Typography>
            <Divider sx={{my: 3}}/>
            <Alert severity="warning">Warning: This content requires login.</Alert>
        </div>
    )
}
