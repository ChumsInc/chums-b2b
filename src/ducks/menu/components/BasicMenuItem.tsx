import React from 'react';
import Box, {BoxProps} from "@mui/material/Box";
import MenuItemRouterLink from "@/ducks/menu/components/MenuItemRouterLink";
import {MenuItemProps} from "@mui/material/MenuItem";
import {NavMenuItem} from "@/ducks/menu/types";
import {isNavMenuElement} from "@/ducks/menu/utils";

export interface BasicMenuItemProps extends BoxProps {
    item: NavMenuItem;
    urlFormat?: (arg: string) => string;
    disabled?: boolean;
    slotProps?: {
        link?: MenuItemProps;
    }
    children?: React.ReactNode;
}

function BasicMenuItem({item, urlFormat, slotProps, children, disabled, ...rest}: BasicMenuItemProps) {
    if (isNavMenuElement(item)) {
        return item.element;
    }
    return (
        <Box {...rest}>
            <MenuItemRouterLink to={urlFormat ? urlFormat(item.url) : item.url}
                                disabled={disabled ?? slotProps?.link?.disabled}
                                {...slotProps?.link}>
                {item.title}
            </MenuItemRouterLink>
            {children}
        </Box>
    )
}

BasicMenuItem.displayName = 'BasicMenuItem';
export default BasicMenuItem;
