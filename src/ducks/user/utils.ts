import {CustomerKey, CustomerSalesperson, Salesperson, UserCustomerAccess, UserProfile} from "b2b-types";
import {SortProps} from "@typeDefs/generic";
import {generatePath} from "react-router";
import {PATH_CUSTOMER_ACCOUNT, PATH_PROFILE_ACCOUNT} from "@constants/paths";
import {customerSlug, shortCustomerKey} from "@utils/customer";
import {isRejected, UnknownAction} from "@reduxjs/toolkit";
import {UserType} from "./types";
import {Action} from "redux";

export const AUTH_ERROR = 'AUTH_ERROR';

export const salespersonKey = (sp: Salesperson) => `${sp.SalespersonDivisionNo}-${sp.SalespersonNo}`;

export const userAccountSort = (a: UserCustomerAccess, b: UserCustomerAccess): number => {
    return a.id - b.id;
}

export const getPrimaryAccount = (accountList: UserCustomerAccess[]): UserCustomerAccess | null => {
    if (!accountList.length) {
        return null;
    }
    const [primary] = accountList.filter(acct => acct.primaryAccount);
    return primary ?? accountList[0];
}

export const userRepListSort = (a: Salesperson, b: Salesperson) => {
    return salespersonKey(a).toUpperCase() > salespersonKey(b).toUpperCase() ? 1 : -1;
}

export const isCustomerAccess = (value: UserCustomerAccess | null): value is UserCustomerAccess => {
    return !!value && (value as UserCustomerAccess).id !== undefined;
}

export const isUserProfile = (user: UserProfile | null): user is UserProfile => {
    return !!user && (user as UserProfile).id !== undefined;
}

export const isCustomer = (customer: CustomerKey | null): customer is CustomerKey => {
    return !!customer && (customer as CustomerKey).CustomerNo !== undefined;
}

export const customerAccessAccountSorter = (sort: SortProps<UserCustomerAccess>) =>
    (a: UserCustomerAccess, b: UserCustomerAccess) => {
        return (a[sort.field] === b[sort.field]
            ? (a.id - b.id)
            : ((a[sort.field] || '') > (b[sort.field] || '') ? 1 : -1)) * (sort.ascending ? 1 : -1)
    };

export const salespersonPath = (rep: CustomerSalesperson | null) => {
    if (!rep) {
        return '---';
    }
    if (rep.SalespersonDivisionNo === '%' && rep.SalespersonNo === '%') {
        return 'all';
    }
    return `${rep.SalespersonDivisionNo}-${rep.SalespersonNo}`;
}
export const customerPath = (customer: CustomerKey) => `${customer.ARDivisionNo}-${customer.CustomerNo}`;

export const customerURL = (customer: CustomerKey) => `/account/${encodeURIComponent(customerPath(customer))}`;
export const customerCartURL = (customer: CustomerKey, cartId?: number) => {
    return generatePath('/account/:customerSlug/carts/:cartId', {
        customerSlug: customerSlug(customer),
        cartId: `${cartId}`
    });
};
export const repAccountListURL = (rep: CustomerSalesperson) => `/profile/rep/${encodeURIComponent(salespersonPath(rep))}`;

export const accessListURL = (access: UserCustomerAccess) => {
    if (access.isRepAccount) {
        return generatePath(PATH_PROFILE_ACCOUNT, {id: access.id.toString()});
    }
    return generatePath(PATH_CUSTOMER_ACCOUNT, {customerSlug: shortCustomerKey(access)});
}


export const canEditAccountRoles: string[] = ['root', 'admin', 'cs', 'sales'];

export const repAccessCode = (row: UserCustomerAccess): string => {
    if (row.SalespersonDivisionNo === '%' && row.SalespersonNo === '%') {
        return 'ALL';
    }
    if (row.SalespersonDivisionNo === '%') {
        return `ALL-${row.SalespersonNo}`;
    }
    if (row.SalespersonNo === '%') {
        return `${row.SalespersonDivisionNo}-ALL`;
    }
    return `${row.SalespersonDivisionNo}-${row.SalespersonNo}`;
};

export const isUserAction = (action: Action | UnknownAction): boolean => {
    return action.type.startsWith('user/')
}

export const is401Action = (action: Action | UnknownAction): boolean => {
    return isRejected(action) && action.error.name === AUTH_ERROR;
}

export const getUserType = (profile: UserProfile | null): UserType | null => {
    if (!isUserProfile(profile)) {
        return null;
    }
    switch (profile.accountType) {
        case 1:
            return 'EMPLOYEE';
        case 2:
            return 'REP';
        case 4:
            return 'CUSTOMER';
    }
}
