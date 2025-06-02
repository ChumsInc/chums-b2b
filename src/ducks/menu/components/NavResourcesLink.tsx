import {NavItemProps} from "@/types/ui-features";
import React from "react";
import {selectResourcesMenu} from "@/ducks/menu";
import DrawerMenu from "@/ducks/menu/components/DrawerMenu";
import BasicMenu from "@/ducks/menu/components/BasicMenu";
import {useAppSelector} from "@/app/configureStore";

export default function NavResourcesLink({inDrawer}: NavItemProps) {
    const menu = useAppSelector(selectResourcesMenu);

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

