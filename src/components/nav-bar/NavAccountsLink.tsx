import type {NavItemProps} from "@/types/ui-features.ts";
import {useEffect, useState} from "react";
import {selectLoggedIn} from "@/ducks/user/selectors.ts";
import {accessListURL, customerURL, repAccessCode} from "@/ducks/user/utils.ts";
import UserAvatar from "@/components/user/UserAvatar.tsx";
import type {MinimalMenuItem} from "@/ducks/menu/types";
import DrawerMenu from "@/components/nav-bar/DrawerMenu.tsx";
import {useAppSelector} from "@/app/configureStore.ts";
import MenuLinkProfile from "@/components/nav-bar/MenuLinkProfile.tsx";
import {selectRecentCustomers} from "@/ducks/customers/recentCustomersSlice.ts";
import {customerNo, shortCustomerKey} from "@/utils/customer.ts";
import CompoundMenu from "@/components/nav-bar/CompoundMenu.tsx";
import {selectCurrentAccess, selectRepAccessList} from "@/ducks/user/userAccessSlice.ts";


const defaultItems: MinimalMenuItem[] = [
    {
        id: 'profile',
        title: 'Profile',
        url: '/profile',
        menu: {
            items: [{id: 'avatar', title: <UserAvatar/>, url: '/profile'}]
        }
    },
    {
        id: 'access-list',
        title: 'Customer List',
        url: '/profile',
    },
    {
        id: 'recent-customers',
        title: 'Recent Customers',
        url: '/profile',
    }
]

export default function NavAccountsLink({inDrawer}: NavItemProps) {
    const isLoggedIn = useAppSelector(selectLoggedIn);
    const accessList = useAppSelector(selectRepAccessList);
    const access = useAppSelector(selectCurrentAccess);
    const recentCustomers = useAppSelector(selectRecentCustomers);

    const drawerItems: MinimalMenuItem[] = [
        {id: 'profile', title: 'Profile', url: '/profile'},
        ...accessList.map(access => ({
            id: access.id,
            title: access.SalespersonName ?? repAccessCode(access),
            url: accessListURL(access),
        })),
    ]

    const items: MinimalMenuItem[] = [
        defaultItems[0],
        {
            ...defaultItems[1],
            url: access ? accessListURL(access) : '/profile',
            menu: {
                items: accessList.map(access => ({
                    id: access.id,
                    title: <MenuLinkProfile linkCode={repAccessCode(access)}
                                            linkName={access.SalespersonName ?? ''}/>,
                    url: accessListURL(access),
                }))
            }
        },
        {
            ...defaultItems[2],
            url: access ? accessListURL(access) : '/profile',
            menu: {
                items: recentCustomers.map(customer => ({
                    id: shortCustomerKey(customer),
                    title: <MenuLinkProfile linkCode={customerNo(customer)}
                                            linkName={customer.CustomerName ?? ''}/>,
                    url: customerURL(customer),
                }))
            }
        }
    ]

    if (!isLoggedIn) {
        return null;
    }

    if (inDrawer) {
        return (
            <DrawerMenu title="Accounts" items={drawerItems}/>
        )
    }

    return (
        <CompoundMenu title="Accounts" items={items} urlFormat={(url) => url}/>
    )
    //
    // return (
    //     <BasicMenu title="Accounts"
    //                items={items}
    //                sx={{
    //                    '& .MuiMenu-list': {
    //                        flexDirection: 'row'
    //                    }
    //                }}>
    //     </BasicMenu>
    // )
}
