import RoutedLink from "./RoutedLink";
import ChumsLogo from "../ChumsLogo";
import Typography from "@mui/material/Typography";
import type {SxProps} from "@mui/material/styles";


export default function HomeLink({sx}:{
    sx?:SxProps
}) {
    return (
        <Typography variant="h6" component="div" sx={{flexGrow: 0, display: {xs: 'none', sm: 'block'}, ...sx}}>
            <RoutedLink to="/" className="nav-link home-link">
                <ChumsLogo />
            </RoutedLink>
        </Typography>
    )
}
