import {type ReactNode, useCallback, useEffect, useMemo} from "react";
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {
    selectCustomerAccount,
    selectCustomerKey,
    selectCustomerLoadStatus
} from "@/ducks/customer/currentCustomerSlice.ts";
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
import {CustomerContext, type CustomerContextState} from "@/hooks/customer/CustomerContext.tsx";
import {useLocation, useNavigate, useParams} from "react-router";
import LocalStore from "@/utils/LocalStore.ts";
import {STORE_CUSTOMER, STORE_CUSTOMER_SHIPTO} from "@/constants/stores.ts";
import {canStorePreferences} from "@/ducks/cookie-consent/utils.ts";
import {ga4SelectCustomer} from "@/utils/ga4/generic.ts";
import {toCustomerKey} from "@/ducks/customer/utils.ts";

export interface CustomerProviderProps {
    children: ReactNode;
}

export default function CustomerProvider({children}: CustomerProviderProps) {
    const dispatch = useAppDispatch();
    const customerKey = useAppSelector(selectCustomerKey)
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
            LocalStore.setItem<string | null>(STORE_CUSTOMER_SHIPTO, permissions?.billTo ? null : next?.ShipToCode ?? null);
            if (location.state?.returnTo) {
                navigate(location.state.returnTo, {replace: true});
            }
        }
    }, [isLoggedIn, customerKey, dispatch, permissions, location, navigate]);

    const handleShipToChange = useCallback((shipToCode: string | null) => {
        if (isLoggedIn && shipToCode !== shipTo?.ShipToCode) {
            const _shipTo = shipToAddresses.find(a => a.ShipToCode === shipToCode);
            LocalStore.setItem<string | null>(STORE_CUSTOMER_SHIPTO, permissions?.billTo ? null : shipToCode);
            dispatch(setShipToCode(_shipTo?.ShipToCode ?? null));
        }
    }, [isLoggedIn, shipTo, shipToAddresses, permissions, dispatch])

    const reloadCustomer = useCallback(() => {
        if (isLoggedIn && customer) {
            dispatch(loadCustomer(customer));
        }
    }, [isLoggedIn, customer, dispatch]);

    useEffect(() => {
        if (canStorePreferences()) {
            const nextCustomer = LocalStore.getItem<CustomerKey | null>(STORE_CUSTOMER, null);
            if (!nextCustomer) {
                return;
            }
            const nextShipTo = LocalStore.getItem<string | null>(STORE_CUSTOMER_SHIPTO, null);
            if (nextShipTo) {
                nextCustomer.ShipToCode = nextShipTo;
            }
            dispatch(loadCustomer(nextCustomer));
        }
    }, [dispatch]);

    useEffect(() => {
        if (isLoggedIn && canStorePreferences()) {
            const key = toCustomerKey(customer);
            LocalStore.setItem<CustomerKey|null>(STORE_CUSTOMER, key);
            if (key) {
                ga4SelectCustomer(customerSlug(key)!);
            }
        }
    }, [customer, isLoggedIn]);

    useEffect(() => {
        if (params.customerSlug) {
            handleCustomerKeyChange(params.customerSlug);
        }
    }, [handleCustomerKeyChange, params]);

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
