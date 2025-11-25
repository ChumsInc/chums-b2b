import type {NavItemProps} from "@/types/ui-features";
import {selectLoggedIn} from "@/ducks/user/userProfileSlice";
import ListItemLink from "../ListItemLink";
import {PATH_LOGIN} from "@/constants/paths";
import NavItemButtonLink from "./NavItemButtonLink";
import {useAppSelector} from "@/app/hooks";
import {useEffect, useState} from "react";


export default function NavLoginLink({inDrawer}: NavItemProps) {
    const isLoggedIn = useAppSelector(selectLoggedIn);
    const [shouldShow, setShouldShow] = useState(true);

    useEffect(() => {
        setShouldShow(!isLoggedIn);
    }, [isLoggedIn])

    if (!shouldShow) {
        return null;
    }

    if (inDrawer) {
        return (
            <ListItemLink to={PATH_LOGIN} primary="Login"/>
        )
    }
    return (
        <NavItemButtonLink to={PATH_LOGIN}>Login</NavItemButtonLink>
    )
}
