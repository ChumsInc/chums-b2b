import Link, {type LinkProps} from "@mui/material/Link";
import {Link as RouterLink} from 'react-router';


interface RoutedLinkProps extends LinkProps {
    to: string;
    replace?: boolean;
}
export default function RoutedLink(props:RoutedLinkProps) {
    return <Link underline="hover" {...props} component={RouterLink} />
}
