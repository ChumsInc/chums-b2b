import type {NavItemProps} from "@/types/ui-features";
import {selectLoggedIn} from "@/ducks/user/userProfileSlice";
import {accessListURL, customerURL, repAccessCode} from "@/ducks/user/utils";
import UserAvatar from "@/components/user/UserAvatar";
import type {MinimalMenuItem} from "@/ducks/menu/types";
import DrawerMenu from "@/components/nav-bar/DrawerMenu";
import {useAppSelector} from "@/app/hooks";
import MenuLinkProfile from "@/components/nav-bar/MenuLinkProfile";
import {selectRecentCustomers} from "@/ducks/customers/recentCustomersSlice";
import {customerNo, shortCustomerKey} from "@/utils/customer";
import CompoundMenu from "@/components/nav-bar/CompoundMenu";
import {selectCurrentAccess, selectRepAccessList} from "@/ducks/user/userAccessSlice";
import {useEffect, useState} from "react";


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
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(isLoggedIn);
    }, [isLoggedIn]);

    const drawerItems: MinimalMenuItem[] = [
        {id: 'profile', title: 'Profile', url: '/profile'},
        ...accessList.map(_access => ({
            id: _access.id,
            title: _access.SalespersonName ?? repAccessCode(_access),
            url: accessListURL(_access),
        })),
    ]

    const items: MinimalMenuItem[] = [
        defaultItems[0],
        {
            ...defaultItems[1],
            url: access ? accessListURL(access) : '/profile',
            menu: {
                items: accessList.map(_access => ({
                    id: _access.id,
                    title: <MenuLinkProfile linkCode={repAccessCode(_access)}
                                            linkName={_access.SalespersonName ?? ''}/>,
                    url: accessListURL(_access),
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

    if (!show) {
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
}
