import type {NavItemProps} from "@/types/ui-features.ts";
import {selectLoggedIn} from "@/ducks/user/selectors.ts";
import ListItemLink from "../ListItemLink.tsx";
import {PATH_LOGIN} from "@/constants/paths.ts";
import NavItemButtonLink from "./NavItemButtonLink.tsx";
import {useAppSelector} from "@/app/configureStore.ts";


export default function NavLoginLink({inDrawer}: NavItemProps) {
    const isLoggedIn = useAppSelector(selectLoggedIn);
    if (isLoggedIn) {
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
