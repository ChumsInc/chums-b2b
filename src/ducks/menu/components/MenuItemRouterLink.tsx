import React from 'react';
import {Link as RouterLink} from 'react-router';
import MenuItem, {MenuItemProps} from "@mui/material/MenuItem";

export interface MenuItemRouterLinkProps extends MenuItemProps {
    to: string;
    replace?: boolean;
    children: React.ReactNode;
}
export default function MenuItemRouterLink({to, replace, children, ...props}:MenuItemRouterLinkProps) {
    return (
        <MenuItem component={RouterLink} to={to} replace={replace} underline="hover" {...props}>
            {children}
        </MenuItem>
    )
}
