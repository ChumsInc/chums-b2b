import type {NavItemProps} from "@/types/ui-features";
import {selectLoggedIn} from "@/ducks/user/userProfileSlice";
import {accessListURL, customerURL, repAccessCode} from "@/ducks/user/utils";
import UserAvatar from "@/components/user/UserAvatar";
import type {MinimalMenuItem} from "@/ducks/menu/types";
import DrawerMenu from "@/components/nav-bar/DrawerMenu";
import {useAppSelector} from "@/app/configureStore";
import MenuLinkProfile from "@/components/nav-bar/MenuLinkProfile";
import {selectRecentCustomers} from "@/ducks/customers/recentCustomersSlice";
import {customerNo, shortCustomerKey} from "@/utils/customer";
import CompoundMenu from "@/components/nav-bar/CompoundMenu";
import {selectCurrentAccess, selectRepAccessList} from "@/ducks/user/userAccessSlice";


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
