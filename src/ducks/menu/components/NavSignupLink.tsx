import {NavItemProps} from "@/types/ui-features";
import {selectLoggedIn} from "../../user/selectors";
import ListItemLink from "../../../components/ListItemLink";
import {PATH_SIGNUP} from "@/constants/paths";
import React from "react";
import NavItemButtonLink from "./NavItemButtonLink";
import {useAppSelector} from "@/app/configureStore";

export default function NavSignupLink({inDrawer}: NavItemProps) {
    const isLoggedIn = useAppSelector(selectLoggedIn);
    if (isLoggedIn) {
        return null;
    }
    if (inDrawer) {
        return (<ListItemLink to={PATH_SIGNUP} primary="Sign Up"/>)
    }
    return (
        <NavItemButtonLink to={PATH_SIGNUP}>Sign Up</NavItemButtonLink>
    )
}
