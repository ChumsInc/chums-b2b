import {type ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {selectCustomerAccount, selectCustomerLoadStatus} from "@/ducks/customer/currentCustomerSlice.ts";
import {
    selectCustomerShipTo,
    selectPermittedShipToAddresses,
    setShipToCode
} from "@/ducks/customer/customerShipToAddressSlice.ts";
import {selectCustomerPermissions} from "@/ducks/customer/customerPermissionsSlice.ts";
import {selectLoggedIn} from "@/ducks/user/userProfileSlice.ts";
import type {CustomerKey} from "chums-types/b2b";
import {customerSlug, parseCustomerSlug} from "@/utils/customer.ts";
import {loadCustomer} from "@/ducks/customer/actions.ts";
import {CustomerContext, type CustomerContextState} from "@/components/customer/CustomerContext.tsx";
import {useLocation, useNavigate, useParams} from "react-router";
import LocalStore from "@/utils/LocalStore.ts";
import {STORE_CUSTOMER, STORE_CUSTOMER_SHIPTO} from "@/constants/stores.ts";
import {toCustomerKey} from "@/ducks/customer/utils.ts";
import {canStorePreferences} from "@/ducks/cookie-consent/utils.ts";
import {ga4SelectCustomer} from "@/utils/ga4/generic.ts";

export interface CustomerProviderProps {
    children: ReactNode;
}

export default function CustomerProvider({children}: CustomerProviderProps) {
    const dispatch = useAppDispatch();
    const [customerKey, setCustomerKey] = useState<string | null>(null);
    const isLoggedIn = useAppSelector(selectLoggedIn);
    const customer = useAppSelector(selectCustomerAccount);
    const shipToAddresses = useAppSelector(selectPermittedShipToAddresses);
    const shipTo = useAppSelector(selectCustomerShipTo);
    const permissions = useAppSelector(selectCustomerPermissions);
    const status = useAppSelector(selectCustomerLoadStatus);
    const params = useParams<'customerSlug'>();
    const location = useLocation();
    const navigate = useNavigate();

    const handleCustomerKeyChange = useCallback((key: CustomerKey | string | null) => {
        const _key = typeof key === 'string' ? key : customerSlug(key);
        if (isLoggedIn && _key && _key !== customerKey) {
            const next = parseCustomerSlug(_key);
            dispatch(loadCustomer(next));
            LocalStore.setItem<string|null>(STORE_CUSTOMER_SHIPTO, permissions?.billTo ? null : next?.ShipToCode ?? null);
            if (location.state?.returnTo) {
                navigate(location.state.returnTo, {replace: true});
            }
        }
    }, [isLoggedIn, customerKey, permissions, dispatch, location]);

    const handleShipToChange = useCallback((shipToCode: string | null) => {
        if (isLoggedIn && shipToCode !== shipTo?.ShipToCode) {
            const _shipTo = shipToAddresses.find(a => a.ShipToCode === shipToCode);
            LocalStore.setItem<string|null>(STORE_CUSTOMER_SHIPTO, permissions?.billTo ? null : shipToCode);
            dispatch(setShipToCode(_shipTo?.ShipToCode ?? null));
        }
    }, [isLoggedIn, customer, shipTo, shipToAddresses, permissions])

    const reloadCustomer = useCallback(() => {
        if (isLoggedIn && customer) {
            dispatch(loadCustomer(customer));
        }
    }, [isLoggedIn, customer]);

    useEffect(() => {
        if (canStorePreferences()) {
            const nextCustomer = LocalStore.getItem<CustomerKey | null>(STORE_CUSTOMER, null);
            const nextShipTo = LocalStore.getItem<string | null>(STORE_CUSTOMER_SHIPTO, null);
            if (nextCustomer && nextShipTo) {
                nextCustomer.ShipToCode = nextShipTo;
            }
            dispatch(loadCustomer(nextCustomer));

        }
    }, [dispatch]);

    useEffect(() => {
        setCustomerKey(customerSlug(customer));
        LocalStore.setItem(STORE_CUSTOMER, toCustomerKey(customer));
        if (customer) {
            ga4SelectCustomer(customerSlug(customer)!);
        }
    }, [customer]);

    useEffect(() => {
        if (params.customerSlug) {
            handleCustomerKeyChange(params.customerSlug);
        }
    }, [params]);

    const contextValue = useMemo<CustomerContextState>(() => ({
        customerKey,
        customer,
        shipToAddresses,
        shipTo,
        permissions,
        status,
        reloadCustomer,
        setCustomerKey: handleCustomerKeyChange,
        setShipTo: handleShipToChange,
    }), [
        customerKey,
        customer,
        shipToAddresses,
        shipTo,
        permissions,
        status,
        reloadCustomer,
        handleCustomerKeyChange,
        handleShipToChange
    ])

    return (
        <CustomerContext value={contextValue}>
            {children}
        </CustomerContext>
    )
}
