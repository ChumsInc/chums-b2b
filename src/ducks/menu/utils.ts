import {generatePath} from "react-router";
import type {BillToCustomer, MenuItem} from "chums-types/b2b";
import type {MenuElement, MinimalMenuItem, NavMenuItem} from "@/ducks/menu/types.js";
import {customerPath} from "@/ducks/user/utils.js";

export const defaultFormatter = (val: string) => val;

export const defaultMenuSorter = (a: MenuItem, b: MenuItem) => a.priority === b.priority
    ? (
        a.title.toLocaleLowerCase() === b.title.toLocaleLowerCase()
            ? 0
            : (a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase() ? 1 : -1)
    )
    : (a.priority > b.priority ? 1 : -1);



export const defaultMenuItem:MenuItem = {
    title: '',
    url: '',
    id: 0,
    description: '',
    className: '',
    parentId: 0,
    priority: 0,
    status: true,
}

export function buildCustomerMenuItems(account:BillToCustomer):MinimalMenuItem[] {
    const customerSlug = customerPath(account);
    return [
        {
            id: 'account',
            title: 'Billing address',
            url: generatePath('/account/:customerSlug', {customerSlug})
        },
        {
            id: 'delivery',
            title: 'Delivery Addresses',
            url: generatePath('/account/:customerSlug/delivery', {customerSlug}),
        },
        {
            id: 'carts',
            title: 'Carts',
            url: generatePath('/account/:customerSlug/carts', {customerSlug}),
        },
        {
            id: 'orders',
            title: 'Open Orders',
            url: generatePath('/account/:customerSlug/orders', {customerSlug}),
        },
        {
            id: 'invoices',
            title: 'Invoices',
            url: generatePath('/account/:customerSlug/invoices', {customerSlug}),
        }
    ]
}

export function isNavMenuElement(item:NavMenuItem|MinimalMenuItem|MenuElement):item is MenuElement {
    return (item as MenuElement).element !== undefined;
}

export function isNavMenuItem(item:NavMenuItem|MinimalMenuItem|MenuElement):item is MinimalMenuItem {
    return !isNavMenuElement(item);
}
