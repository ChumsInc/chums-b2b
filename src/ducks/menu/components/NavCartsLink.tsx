import {NavItemProps} from "@/types/ui-features";
import {selectLoggedIn} from "../../user/selectors";
import {selectCustomerAccount} from "../../customer/selectors";
import React, {useEffect} from "react";
import {MinimalMenuItem} from "@/ducks/menu/types";
import {buildCustomerMenuItems} from "@/ducks/menu/utils";
import DrawerMenu from "@/ducks/menu/components/DrawerMenu";
import BasicMenu from "@/ducks/menu/components/BasicMenu";
import {useAppSelector} from "@/app/configureStore";

export default function NavCartsLink({inDrawer}: NavItemProps) {
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
