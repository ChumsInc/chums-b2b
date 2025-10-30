import type {NavItemProps} from "@/types/ui-features.ts";
import {selectLoggedIn} from "@/ducks/user/selectors.ts";
import {selectCustomerAccount} from "@/ducks/customer/selectors.ts";
import React, {useEffect} from "react";
import type {MinimalMenuItem} from "@/ducks/menu/types";
import {buildCustomerMenuItems} from "@/ducks/menu/utils.ts";
import DrawerMenu from "@/components/nav-bar/DrawerMenu.tsx";
import BasicMenu from "@/components/nav-bar/BasicMenu.tsx";
import {useAppSelector} from "@/app/configureStore.ts";

export default function NavCustomerLink({inDrawer}: NavItemProps) {
    const isLoggedIn = useAppSelector(selectLoggedIn);
    const account = useAppSelector(selectCustomerAccount);

    const [items, setItems] = React.useState<MinimalMenuItem[]>([]);
    useEffect(() => {
        if (!account || !isLoggedIn) {
            setItems([]);
            return;
        }
        setItems(buildCustomerMenuItems(account));
    }, [account, isLoggedIn]);

    if (!isLoggedIn) {
        return null;
    }

    if (inDrawer) {
        return (
            <DrawerMenu title="Customer" items={items}/>
        )
    }

    return (
        <BasicMenu title="Customer"
                   sx={{
                       '& .MuiMenu-list': {
                           flexDirection: 'column',
                       },
                   }}
                   items={items}>
        </BasicMenu>
    )
}
