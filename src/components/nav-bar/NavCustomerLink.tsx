import type {NavItemProps} from "@/types/ui-features";
import {selectLoggedIn} from "@/ducks/user/selectors";
import {selectCustomerAccount} from "@/ducks/customer/selectors";
import React, {useEffect} from "react";
import type {MinimalMenuItem} from "@/ducks/menu/types";
import {buildCustomerMenuItems} from "@/ducks/menu/utils";
import DrawerMenu from "@/components/nav-bar/DrawerMenu";
import BasicMenu from "@/components/nav-bar/BasicMenu";
import {useAppSelector} from "@/app/configureStore";

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
