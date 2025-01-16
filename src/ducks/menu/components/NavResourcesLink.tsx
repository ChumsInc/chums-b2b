import {NavItemProps} from "@typeDefs/ui-features";
import React from "react";
import {useSelector} from "react-redux";
import {selectResourcesMenu} from "@ducks/menu";
import DrawerMenu from "@ducks/menu/components/DrawerMenu";
import BasicMenu from "@ducks/menu/components/BasicMenu";

export default function NavResourcesLink({inDrawer}: NavItemProps) {
    const menu = useSelector(selectResourcesMenu);

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

