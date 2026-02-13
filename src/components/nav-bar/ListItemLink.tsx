import {type ReactElement, type ReactNode, type RefObject} from "react";
import {Link as RouterLink, type LinkProps as RouterLinkProps,} from 'react-router';
import ListItem, {type ListItemProps} from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';


export interface ListItemLinkProps extends ListItemProps {
    icon?: ReactElement;
    primary: ReactNode;
    to: string;
}
interface LinkProps extends RouterLinkProps {
    ref: RefObject<HTMLAnchorElement>
}

function Link({ref, ...itemProps}: LinkProps) {
    return <RouterLink ref={ref} {...itemProps} role={undefined}/>;
}

export default function ListItemLink(props: ListItemLinkProps) {
    const {icon, primary, to, ...rest} = props;

    return (
        <ListItem component={Link} to={to} sx={{color: 'theme.palette.common.black'}} {...rest}>
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
            <ListItemText primary={primary}/>
        </ListItem>
    );
}
