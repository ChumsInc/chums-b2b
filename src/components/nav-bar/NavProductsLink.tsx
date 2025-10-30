import {useEffect, useState} from 'react';
import type {NavItemProps} from "@/types/ui-features.ts";
import {loadProductMenu, selectProductMenu, selectShouldLoadProductMenu} from "@/ducks/menu";
import DrawerMenu from "@/components/nav-bar/DrawerMenu.tsx";
import type {MinimalMenuItem} from "@/ducks/menu/types";
import CompoundMenu from "@/components/nav-bar/CompoundMenu.tsx";
import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";

const productUrl = (url: string) => `/products${url}`;

export default function NavProductsLink({inDrawer}: NavItemProps) {
    const dispatch = useAppDispatch();
    const shouldLoad = useAppSelector(selectShouldLoadProductMenu);
    const productMenu = useAppSelector(selectProductMenu);
    const [items, setItems] = useState<MinimalMenuItem[]>(productMenu?.items ?? []);

    useEffect(() => {
        if (shouldLoad) {
            dispatch(loadProductMenu());
        }
    }, [dispatch, shouldLoad]);

    useEffect(() => {
        setItems(productMenu?.items ?? [])
    }, [productMenu]);

    if (inDrawer) {
        return (
            <DrawerMenu title="Products" items={items.map(item => ({...item, url: `/products${item.url}`}))}/>
        )
    }

    return (
        <CompoundMenu title="Products" items={items} urlFormat={productUrl} mediaQuery={"(min-width: 1000px)"}/>
    )
}
