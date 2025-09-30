import {NavItemProps} from "@/types/ui-features";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {loadResourcesMenu, selectResourcesMenu, selectShouldLoadResourcesMenu} from "@/ducks/menu";
import DrawerMenu from "@/ducks/menu/components/DrawerMenu";
import BasicMenu from "@/ducks/menu/components/BasicMenu";
import {useAppDispatch} from "@/app/configureStore";

export default function NavResourcesLink({inDrawer}: NavItemProps) {
    const dispatch = useAppDispatch();
    const shouldLoad = useSelector(selectShouldLoadResourcesMenu);
    const menu = useSelector(selectResourcesMenu);

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

