import {useEffect, useId, useRef, useState} from 'react';
import NavItemButton from "@/components/nav-bar/NavItemButton.tsx";
import Popover, {type PopoverProps} from "@mui/material/Popover";
import Box, {type BoxProps} from "@mui/material/Box";
import {useLocation} from "react-router";
import type {MinimalMenuItem} from "@/ducks/menu/types";
import {type ButtonProps} from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useAppSelector} from "@/app/configureStore.ts";
import {selectLoggedIn} from "@/ducks/user/selectors.ts";
import {type SxProps} from "@mui/system";
import {type Theme} from "@mui/material/styles";
import {MenuList} from "@mui/material";
import MenuItemRouterLink from "@/components/nav-bar/MenuItemRouterLink.tsx";

const itemStyle: SxProps<Theme> = {
    textTransform: 'uppercase',
    fontWeight: 700,
}

export interface CompoundMenuProps {
    title: string;
    items: MinimalMenuItem[];
    urlFormat: (url: string) => string;
    mediaQuery?: string;
    requiresLogin?: boolean;
    slotProps?: {
        anchorButton?: ButtonProps;
        popover?: PopoverProps;
        menuContainer?: BoxProps;
    }
}

export default function CompoundMenu({
                                         title,
                                         items,
                                         slotProps,
                                         mediaQuery,
                                         urlFormat,
                                         requiresLogin,
                                     }: CompoundMenuProps) {
    const location = useLocation();
    const buttonId = slotProps?.anchorButton?.id ?? useId();
    const popoverId = useId();
    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const mediaLg = useMediaQuery(mediaQuery ?? '(min-width: 1200px)');
    const isLoggedIn = useAppSelector(selectLoggedIn);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(false);
    }, [location]);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <NavItemButton id={buttonId}
                           ref={anchorRef}
                           disabled={slotProps?.anchorButton?.disabled || !items.length || (requiresLogin && !isLoggedIn)}
                           sx={{height: '100%'}}
                           aria-controls={open ? popoverId : undefined}
                           aria-expanded={open ? 'true' : undefined}
                           aria-haspopup="true"
                           onClick={handleClick}>
                {title}
            </NavItemButton>
            <Popover open={!!anchorRef.current && open}
                     id={popoverId}
                     anchorEl={anchorRef.current} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                     onClick={handleClose} onClose={handleClose}>
                <Box sx={{
                    p: 1,
                    maxHeight: '75vh',
                    width: mediaLg ? 'fit-content' : '75vw',
                    maxWidth: '100vw',
                    overflow: 'auto'
                }} aria-describedby={buttonId}>
                    <Stack direction="row" spacing={2}>
                        {items.map(item => (
                            <MenuList key={item.id}>
                                <MenuItemRouterLink to={urlFormat(item.url)} sx={itemStyle}>
                                    {item.title}
                                </MenuItemRouterLink>
                                {item.menu?.items?.map((item) => (
                                    <MenuItemRouterLink key={item.id} disabled={item.requireLogin && !isLoggedIn}
                                                        onClick={handleClick}
                                                        to={urlFormat(item.url)}>
                                        {item.title}
                                    </MenuItemRouterLink>
                                ))}
                            </MenuList>
                        ))}
                    </Stack>
                </Box>
            </Popover>
        </div>
    )
}
