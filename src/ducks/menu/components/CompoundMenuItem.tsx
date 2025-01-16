import React from 'react';
import Box, {BoxProps} from "@mui/material/Box";
import MenuItemRouterLink from "@ducks/menu/components/MenuItemRouterLink";
import BasicMenuItem from "@ducks/menu/components/BasicMenuItem";
import {MenuItemProps} from "@mui/material/MenuItem";
import {NavMenuItem} from "@ducks/menu/types";
import {isNavMenuItem} from "@ducks/menu/utils";

export interface CompoundMenuItemProps extends BoxProps {
    item: NavMenuItem;
    urlFormat?: (arg: string) => string;
    disabled?: boolean;
    slotProps?: {
        link?: MenuItemProps;
        subLink?: MenuItemProps;
    }
}

function CompoundMenuItem({item, urlFormat, slotProps, ...rest}: CompoundMenuItemProps) {
    return (
        <BasicMenuItem item={item} urlFormat={urlFormat} slotProps={slotProps} {...rest}>
            {isNavMenuItem(item) && item.menu && (
                <Box component="ul" sx={{padding: 0}}>
                    {item.menu?.items?.map(subItem => (
                        <MenuItemRouterLink key={subItem.id}
                                            to={urlFormat ? urlFormat(subItem.url) : subItem.url}
                                            {...slotProps?.subLink}>
                            {subItem.title}
                        </MenuItemRouterLink>
                    ))}
                </Box>
            )}
        </BasicMenuItem>
    )
}

CompoundMenuItem.displayName = 'CompoundMenuItem';
export default CompoundMenuItem;
