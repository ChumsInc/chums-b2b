import {generatePath} from "react-router";
import type {BillToCustomer, MenuItem} from "chums-types/b2b";
import type {MinimalMenuItem} from "@/ducks/menu/types";
import {customerPath} from "@/ducks/user/utils";


export const defaultMenuItem: MenuItem = {
    title: '',
    url: '',
    id: 0,
    description: '',
    className: '',
    parentId: 0,
    priority: 0,
    status: true,
}

export function buildCustomerMenuItems(account: BillToCustomer): MinimalMenuItem[] {
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
