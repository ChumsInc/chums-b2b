import {useEffect, useId, useState, type MouseEvent} from 'react';
import {selectLoggedIn} from "@/ducks/user/userProfileSlice";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItemRouterLink from "./MenuItemRouterLink";
import UserAvatar from "@/components/user/UserAvatar";
import {generatePath} from "react-router";
import {useAppSelector} from "@/app/hooks";
import {selectCurrentAccess} from "@/ducks/user/userAccessSlice";


export default function UserMenu() {
    const isLoggedIn = useAppSelector(selectLoggedIn);
    const currentAccess = useAppSelector(selectCurrentAccess);
    const buttonId = useId();
    const menuId = useId();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        setLoggedIn(isLoggedIn);
        if (open && !isLoggedIn) {
            setAnchorEl(null);
        }
    }, [isLoggedIn, open]);


    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (!loggedIn) {
        return (
            <>
                <IconButton onClick={handleClick}>
                    <UserAvatar/>
                </IconButton>
                <Menu id={menuId} open={open} onClose={handleClose} anchorEl={anchorEl}
                      slotProps={{list: {'aria-labelledby': buttonId}}}>
                    <MenuItemRouterLink to="/login">Login</MenuItemRouterLink>
                    {/*<GoogleSignInOneTap onDone={handleClose}/>*/}
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
