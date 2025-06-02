import React, {useEffect, useState} from "react";
import {NavItemProps} from "@/types/ui-features";
import {selectProductMenu} from "../index";
import DrawerMenu from "@/ducks/menu/components/DrawerMenu";
import {MinimalMenuItem} from "@/ducks/menu/types";
import BasicMenu from "@/ducks/menu/components/BasicMenu";
import {useAppSelector} from "@/app/configureStore";

const productUrl = (url: string) => `/products${url}`;

export default function NavProductsLink({inDrawer}: NavItemProps) {
    const productMenu = useAppSelector(selectProductMenu);
    const [items, setItems] = useState<MinimalMenuItem[]>([]);

    useEffect(() => {
        setItems(productMenu?.items ?? [])
    }, [productMenu]);

    if (inDrawer) {
        return (
            <DrawerMenu title="Products" items={items.map(item => ({...item, url: `/products${item.url}`}))}/>
        )
    }

    return (
        <BasicMenu title="Products" urlFormat={productUrl}
                   items={items}
                   sx={{
                       '& .MuiMenu-list': {
                           flexDirection: 'row',
                       },
                   }}
        />
    )
}
