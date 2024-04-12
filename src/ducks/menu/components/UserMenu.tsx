import React, {useEffect, useId, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {selectCurrentAccess, selectLoggedIn, selectLoginExpiry} from "../../user/selectors";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItemRouterLink from "./MenuItemRouterLink";
import GoogleSignInOneTap from "../../user/components/GoogleSignInOneTap";
import UserAvatar from "../../user/components/UserAvatar";
import {generatePath, useLocation} from "react-router-dom";
import {useIsSSR} from "../../../hooks/is-server-side";

const isExpired = (expires: number) => {
    if (!expires || expires < 0) {
        return true;
    }
    return new Date(expires * 1000).valueOf() <= new Date().valueOf();
}


const UserMenu = () => {
    const isSSR = useIsSSR();
    const location = useLocation();
    const isLoggedIn = useSelector(selectLoggedIn);
    const currentAccess = useSelector(selectCurrentAccess);
    const expires = useSelector(selectLoginExpiry);
    const timerRef = useRef<number>(0);
    const buttonId = useId();
    const menuId = useId();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [expired, setExpired] = useState(isExpired(expires));
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (isSSR) {
            return;
        }
        if (isLoggedIn) {
            window.clearInterval(timerRef.current);
            timerRef.current = window.setInterval(() => {
                console.log(`isExpired?`, {expires, isExpired: isExpired(expires)});
                if (isExpired(expires)) {
                    setExpired(true);
                }
            }, 60 * 1000);
        }
        return () => {
            if (isSSR) {
                return;
            }
            console.log('clearInterval', {expires, isLoggedIn})
            window.clearInterval(timerRef.current);
        }
    }, [expires, isLoggedIn]);

    useEffect(() => {
        if (open && !isLoggedIn) {
            setAnchorEl(null);
        }
    }, [isLoggedIn]);


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <IconButton onClick={handleClick}>
                <UserAvatar/>
            </IconButton>
            <Menu id={menuId} open={open} onClose={handleClose} anchorEl={anchorEl}
                  MenuListProps={{'aria-labelledby': buttonId}}>
                {!isLoggedIn && (<MenuItemRouterLink to="/login">Login</MenuItemRouterLink>)}
                {(!isLoggedIn || expired) && location.pathname !== '/login' && (<GoogleSignInOneTap/>)}
                {isLoggedIn && (<MenuItemRouterLink to="/profile">Profile</MenuItemRouterLink>)}
                {isLoggedIn && currentAccess && (
                    <MenuItemRouterLink to={generatePath('/profile/:id', {id: `${currentAccess.id}`})}>
                        Accounts
                    </MenuItemRouterLink>
                )}
                {isLoggedIn && (<MenuItemRouterLink to="/logout">Logout</MenuItemRouterLink>)}
            </Menu>
            {/*{(!isLoggedIn || expired) && typeof window !== 'undefined' && <GoogleSignInOneTap onSignIn={() => setAnchorEl(null)}/>}*/}
        </>
    )
}


export default UserMenu;
