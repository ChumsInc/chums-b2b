import type {CustomerKey, CustomerSalesperson, Salesperson, UserCustomerAccess, UserProfile} from "chums-types/b2b";
import {generatePath} from "react-router";
import {PATH_CUSTOMER_ACCOUNT, PATH_PROFILE_ACCOUNT} from "@/constants/paths";
import {customerSlug, shortCustomerKey} from "@/utils/customer";
import {isRejected, type UnknownAction} from "@reduxjs/toolkit";
import type {UserType} from "./types";
import type {Action} from "redux";

export const AUTH_ERROR = 'AUTH_ERROR';

export const salespersonKey = (sp: Salesperson) => `${sp.SalespersonDivisionNo}-${sp.SalespersonNo}`;


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

export const accessListURL = (access: UserCustomerAccess) => {
    if (access.isRepAccount) {
        return generatePath(PATH_PROFILE_ACCOUNT, {id: access.id.toString()});
    }
    return generatePath(PATH_CUSTOMER_ACCOUNT, {customerSlug: shortCustomerKey(access)});
}

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
        default:
            return null;
    }
}
