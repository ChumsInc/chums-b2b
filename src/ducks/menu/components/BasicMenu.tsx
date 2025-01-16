import React, {useEffect, useId} from 'react';
import useMediaQuery from "@mui/material/useMediaQuery";
import Menu, {MenuProps} from "@mui/material/Menu";
import NavItemButton from "@ducks/menu/components/NavItemButton";
import {deepmerge} from '@mui/utils'
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import CompoundMenuItem from "@ducks/menu/components/CompoundMenuItem";
import {NavMenuItem} from "@ducks/menu/types";
import {useLocation} from "react-router";
import {useAppSelector} from "@app/configureStore";
import {selectLoggedIn} from "@ducks/user/selectors";

const itemStyle: SxProps<Theme> = {
    textTransform: 'uppercase',
    fontWeight: 700,
}

export interface BasicMenuProps extends Omit<MenuProps, 'open' | 'onClose' | 'anchorEl' | 'title'> {
    title: string | React.ReactNode;
    items: NavMenuItem[];
    urlFormat?: (url: string) => string;
    mediaQuery?: string;
    children?: React.ReactNode;
}

export default function BasicMenu({title, items, sx, urlFormat, mediaQuery, children, ...rest}: BasicMenuProps) {
    const location = useLocation();
    const isLoggedIn = useAppSelector(selectLoggedIn);
    const mediaLg = useMediaQuery(mediaQuery ?? '(min-width: 1200px)');
    const buttonId = useId();
    const menuId = useId();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    useEffect(() => {
        setAnchorEl(null);
    }, [location]);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <NavItemButton id={buttonId}
                           disabled={!items.length}
                           sx={{height: '100%'}}
                           aria-controls={open ? menuId : undefined}
                           aria-expanded={open ? 'true' : undefined}
                           aria-haspopup="true"
                           onClick={handleClick}>
                {title}
            </NavItemButton>
            <Menu id={menuId}
                  {...rest}
                  open={open} onClose={handleClose}
                  anchorEl={anchorEl}
                  MenuListProps={{'aria-labelledby': buttonId}}
                  sx={deepmerge({
                      '& .MuiMenu-list': {
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          justifyContent: 'flex-start',
                          color: '#000000',
                      },
                  }, sx)}
                  slotProps={{
                      paper: {
                          style: {
                              maxHeight: '75vh',
                              width: mediaLg ? 'fit-content' : '75vw',
                              maxWidth: '100vw',
                          },

                      }
                  }}>
                {items.map(item => (
                    <CompoundMenuItem key={item.id} item={item} urlFormat={urlFormat}
                                      slotProps={{
                                          link: {onClick: handleClose, sx: itemStyle, disabled: item.requireLogin && !isLoggedIn},
                                          subLink: {onClick: handleClose},
                                      }}/>
                ))}
                {children}
            </Menu>
        </>
    )
}
