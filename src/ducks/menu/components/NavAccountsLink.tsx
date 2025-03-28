import {NavItemProps} from "@/types/ui-features";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectCurrentAccess, selectLoggedIn, selectRepAccessList} from "../../user/selectors";
import {accessListURL, customerURL, repAccessCode} from "../../user/utils";
import UserAvatar from "../../user/components/UserAvatar";
import BasicMenu from "@/ducks/menu/components/BasicMenu";
import {MinimalMenuItem} from "@/ducks/menu/types";
import DrawerMenu from "@/ducks/menu/components/DrawerMenu";
import {useAppSelector} from "@/app/configureStore";
import MenuLinkProfile from "@/ducks/menu/components/MenuLinkProfile";
import {selectRecentCustomers} from "@/ducks/customers/selectors";
import {customerNo, shortCustomerKey} from "@/utils/customer";


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
        url: '#',
    }
]

export default function NavAccountsLink({inDrawer}: NavItemProps) {
    const isLoggedIn = useSelector(selectLoggedIn);
    const accessList = useSelector(selectRepAccessList);
    const access = useAppSelector(selectCurrentAccess);
    const recentCustomers = useSelector(selectRecentCustomers);
    const [drawerItems, setDrawerItems] = useState<MinimalMenuItem[]>([]);
    const [items, setItems] = useState<MinimalMenuItem[]>([]);

    useEffect(() => {
        if (!isLoggedIn) {
            setDrawerItems([]);
            return;
        }
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
                url: '#',
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
        setItems(items);
        setDrawerItems(drawerItems);
    }, [isLoggedIn, accessList]);

    if (!isLoggedIn) {
        return null;
    }

    if (inDrawer) {
        return (
            <DrawerMenu title="Accounts" items={drawerItems}/>
        )
    }

    return (
        <BasicMenu title="Accounts"
                   items={items}
                   sx={{
                       '& .MuiMenu-list': {
                           flexDirection: 'row'
                       }
                   }}>
        </BasicMenu>
    )
}
