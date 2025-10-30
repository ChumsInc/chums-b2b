import type {NavItemProps} from "@/types/ui-features";
import {useEffect} from "react";
import {loadResourcesMenu, selectResourcesMenu, selectShouldLoadResourcesMenu} from "@/ducks/menu";
import DrawerMenu from "@/components/nav-bar/DrawerMenu";
import BasicMenu from "@/components/nav-bar/BasicMenu";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";

export default function NavResourcesLink({inDrawer}: NavItemProps) {
    const dispatch = useAppDispatch();
    const shouldLoad = useAppSelector(selectShouldLoadResourcesMenu);
    const menu = useAppSelector(selectResourcesMenu);

    useEffect(() => {
        if (shouldLoad) {
            dispatch(loadResourcesMenu());
        }
    }, [dispatch, shouldLoad]);

    if (inDrawer) {
        return (
            <DrawerMenu title="Resources" to="/resources" items={menu?.items ?? []}/>
        )
    }

    return (
        <BasicMenu title="Resources"
                   items={menu?.items ?? []}
                   sx={{
                       '& .MuiMenu-list': {
                           flexDirection: 'column',
                       },
                   }}
        />
    )
}

