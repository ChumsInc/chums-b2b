import {type ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {selectCustomerAccount, selectCustomerLoadStatus} from "@/ducks/customer/currentCustomerSlice.ts";
import {selectCustomerShipTo} from "@/ducks/customer/customerShipToAddressSlice.ts";
import {selectCustomerPermissions} from "@/ducks/customer/customerPermissionsSlice.ts";
import {selectLoggedIn} from "@/ducks/user/userProfileSlice.ts";
import type {CustomerKey} from "chums-types/b2b";
import {customerSlug, parseCustomerSlug} from "@/utils/customer.ts";
import {loadCustomer} from "@/ducks/customer/actions.ts";
import {CustomerContext, type CustomerContextState} from "@/components/customer/CustomerContext.tsx";
import {useParams} from "react-router";
import LocalStore from "@/utils/LocalStore.ts";
import {STORE_CUSTOMER} from "@/constants/stores.ts";
import {toCustomerKey} from "@/ducks/customer/utils.ts";
import {canStorePreferences} from "@/ducks/cookie-consent/utils.ts";

export interface CustomerProviderProps {
    children: ReactNode;
}

export default function CustomerProvider({children}: CustomerProviderProps) {
    const dispatch = useAppDispatch();
    const [customerKey, setCustomerKey] = useState<string | null>(null);
    const isLoggedIn = useAppSelector(selectLoggedIn);
    const customer = useAppSelector(selectCustomerAccount);
    const shipTo = useAppSelector(selectCustomerShipTo);
    const permissions = useAppSelector(selectCustomerPermissions);
    const status = useAppSelector(selectCustomerLoadStatus);
    const params = useParams<'customerKey'>();

    const handleCustomerKeyChange = useCallback((key: CustomerKey | string | null) => {
        const _key = typeof key === 'string' ? key : customerSlug(key);
        if (isLoggedIn && _key && _key !== customerKey) {
            dispatch(loadCustomer(parseCustomerSlug(_key)));
        }
    }, [isLoggedIn, customerKey, dispatch]);

    const reloadCustomer = useCallback(() => {
        if (isLoggedIn && customer) {
            dispatch(loadCustomer(customer));
        }
    }, [isLoggedIn, customer]);

    useEffect(() => {
        const nextCustomer = LocalStore.getItem<CustomerKey|null>(STORE_CUSTOMER, null);
        if (nextCustomer && canStorePreferences()) {
            dispatch(loadCustomer(nextCustomer));
        }
    }, [dispatch]);

    useEffect(() => {
        setCustomerKey(customerSlug(customer));
        LocalStore.setItem(STORE_CUSTOMER, toCustomerKey(customer));
    }, [customer]);

    useEffect(() => {
        if (isLoggedIn && params.customerKey && params.customerKey !== customerKey) {
            dispatch(loadCustomer(parseCustomerSlug(params.customerKey)));
        }
    }, [isLoggedIn, params, customerKey]);

    const contextValue = useMemo<CustomerContextState>(() => ({
        customerKey,
        setCustomerKey: handleCustomerKeyChange,
        customer,
        shipTo,
        permissions,
        status,
        reloadCustomer,
    }), [customerKey, handleCustomerKeyChange, customer, shipTo, permissions, reloadCustomer])

    return (
        <CustomerContext value={contextValue}>
            {children}
        </CustomerContext>
    )


}
