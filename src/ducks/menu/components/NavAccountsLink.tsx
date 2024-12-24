import {NavItemProps} from "@typeDefs/ui-features";
import ListItemLink from "../../../components/ListItemLink";
import React, {useId} from "react";
import {useSelector} from "react-redux";
import {selectCurrentAccess, selectLoggedIn} from "../../user/selectors";
import {salespersonPath} from "../../user/utils";
import NavItemButton from "./NavItemButton";
import MenuItemRouterLink from "./MenuItemRouterLink";
import Menu from "@mui/material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import RepAccessListMenu from "./RepAccessListMenu";
import RecentCustomersMenu from "./RecentCustomersMenu";
import {SlotComponentProps} from "@mui/base";
import Paper from "@mui/material/Paper";
import UserAvatar from "../../user/components/UserAvatar";

export default function NavAccountsLink({inDrawer}: NavItemProps) {
    const mediaLg = useMediaQuery('(min-width: 1200px)');
    const isLoggedIn = useSelector(selectLoggedIn);
    const access = useSelector(selectCurrentAccess);
    const buttonId = useId();
    const menuId = useId();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const url = access ? `/profile/${salespersonPath(access)}` : '/profile';

    if (!isLoggedIn) {
        return null;
    }

    if (inDrawer) {
        return (
            <ListItemLink primary="Accounts" to={url}/>
        )
    }
    const menuPaperProps: SlotComponentProps<typeof Paper, {}, {}> = {
        style: {
            maxHeight: '75vh',
            width: mediaLg ? 'fit-content' : '75vw',
            maxWidth: '100vw',
        }
    }
    return (
        <>
            <NavItemButton id={buttonId} sx={{height: '100%'}}
                           aria-label="Accounts"
                           aria-controls={open ? menuId : undefined}
                           aria-expanded={open ? 'true' : undefined}
                           aria-haspopup="true"
                           onClick={handleClick}>
                Accounts
            </NavItemButton>
            <Menu id={menuId}
                  open={open} onClose={handleClose}
                  anchorEl={anchorEl}
                  MenuListProps={{'aria-labelledby': buttonId}}
                  sx={{
                      '& .MuiMenu-list': {
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          justifyContent: 'flex-start',
                          color: '#000000'
                      },

                  }}
                  slotProps={{paper: menuPaperProps}}
            >
                <div>
                    <MenuItemRouterLink to={'/profile'} onClick={handleClose}>Profile</MenuItemRouterLink>
                    <MenuItemRouterLink to={'/profile'} onClick={handleClose}><UserAvatar/></MenuItemRouterLink>
                </div>
                <RepAccessListMenu onClick={handleClose}/>
                <RecentCustomersMenu onClick={handleClose}/>
            </Menu>
        </>
    )
}
