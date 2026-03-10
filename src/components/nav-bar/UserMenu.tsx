import {type MouseEvent, useId, useState} from 'react';
import {selectLoggedIn} from "@/ducks/user/userProfileSlice";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItemRouterLink from "./MenuItemRouterLink";
import UserAvatar from "@/components/user/UserAvatar";
import {generatePath} from "react-router";
import {useAppSelector} from "@/app/hooks";
import {useProfile} from "@/components/user/profile-provider/use-profile-hook";


export default function UserMenu() {
    const isLoggedIn = useAppSelector(selectLoggedIn);
    const {currentAccess} = useProfile();
    const buttonId = useId();
    const menuId = useId();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (!isLoggedIn) {
        return (
            <>
                <IconButton onClick={handleClick}>
                    <UserAvatar/>
                </IconButton>
                <Menu id={menuId} open={open} onClose={handleClose} anchorEl={anchorEl}
                      slotProps={{list: {'aria-labelledby': buttonId}}}>
                    <MenuItemRouterLink to="/login">Login</MenuItemRouterLink>
                </Menu>
            </>
        )
    }

    return (
        <>
            <IconButton onClick={handleClick}>
                <UserAvatar/>
            </IconButton>
            <Menu id={menuId} open={open} onClose={handleClose} anchorEl={anchorEl}
                  slotProps={{list: {'aria-labelledby': buttonId}}}>
                <MenuItemRouterLink to="/profile">Profile</MenuItemRouterLink>
                {currentAccess && (
                    <MenuItemRouterLink to={generatePath('/profile/:id', {id: `${currentAccess.id}`})}>
                        Accounts
                    </MenuItemRouterLink>
                )}
                <MenuItemRouterLink to="/logout">Logout</MenuItemRouterLink>
            </Menu>
        </>
    )
}
