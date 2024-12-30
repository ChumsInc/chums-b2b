import {createSelector} from "@reduxjs/toolkit";
import {isBillToCustomer} from "@utils/typeguards";
import {RootState} from "@app/configureStore";
import {ShipToCustomer} from "b2b-types";
import {customerShipToSorter} from "@utils/customer";
import {selectCurrentUserAccount} from "../user/selectors";
import {filterShipToByUserAccount, hasBillToAccess} from "./utils";

export const selectCustomerKey = (state:RootState) => state.customer.key;
export const selectCustomerAccount = (state:RootState) => state.customer.account ?? null;
export const selectCustomerShipToCode = (state:RootState) => state.customer.shipToCode;
export const selectCustomerShipTo = (state:RootState) => state.customer.shipTo;
export const selectTaxSchedule = (state:RootState) => isBillToCustomer(state.customer.account) ? (state.customer.account?.TaxSchedule ?? '') : '';
export const selectCustomerPricing = (state:RootState) => state.customer.pricing ?? [];
export const selectCustomerLoading = (state:RootState) => state.customer.loading  ?? false;
export const selectCustomerLoadStatus = (state:RootState) => state.customer.loadStatus;
export const selectCustomerSaving = (state:RootState) => state.customer.saving ?? false;
export const selectCustomerLoaded = (state:RootState) => state.customer.loaded ?? false;
export const selectCustomerUsers = (state:RootState) => state.customer.users ?? [];
export const selectCustomerShipToAddresses = (state:RootState) => state.customer.shipToAddresses ?? [];
export const selectCustomerPaymentCards = (state:RootState) => state.customer.paymentCards;

export const selectCustomerReturnToPath = (state:RootState) => state.customer.returnToPath;

export const selectCustomerPermissions = (state:RootState) => state.customer.permissions.values;
export const selectCustomerPermissionsLoading = (state:RootState) => state.customer.permissions.loading ?? false;
export const selectCustomerPermissionsLoaded = (state:RootState) => state.customer.permissions.loaded ?? false;


export const selectPermittedBillToAddress = createSelector(
    [selectCustomerPermissions, selectCurrentUserAccount, selectCustomerAccount],
    (permissions, access, customer) => {
        return permissions?.billTo && hasBillToAccess(access, customer);
    }
)
export const selectPermittedShipToAddresses = createSelector(
    [selectCustomerShipToAddresses, selectCustomerPermissions, selectCurrentUserAccount],
    (addresses, permissions, access) => {
        if (permissions?.billTo) {
            return [...addresses]
                .filter(filterShipToByUserAccount(access))
                .sort(customerShipToSorter({field: 'ShipToName', ascending: true}));
        }
        return addresses
            .filter(address => !access?.isRepAccount
                || (
                    [address.SalespersonDivisionNo, '%'].includes(access.SalespersonDivisionNo)
                    && [address.SalespersonDivisionNo, '%'].includes(access.SalespersonDivisionNo)
                ))
            .filter(addr => permissions?.shipTo.includes(addr.ShipToCode))
            .sort(customerShipToSorter({field: 'ShipToName', ascending: true}));
    }
)

export const selectPrimaryShipTo = createSelector(
    [selectCustomerAccount, selectPermittedShipToAddresses, selectCustomerPermissions],
    (account, shipToAddresses, permissions):ShipToCustomer|null => {
        if (!permissions?.billTo || !isBillToCustomer(account)) {
            return null;
        }
        const [shipTo] = shipToAddresses.filter(st => st.ShipToCode === account.PrimaryShipToCode);
        return shipTo ?? null;
    }
)


export const selectPrimaryShipToCode = createSelector(
    [selectPrimaryShipTo],
    (shipTo) => {
        return shipTo?.ShipToCode ?? null;
    }
)
export const selectPermittedCustomerUsers = createSelector(
    [selectCustomerUsers, selectPermittedBillToAddress, selectPermittedShipToAddresses],
    (users, billTo, shipToAddresses) => {
        return users.filter(user => billTo || shipToAddresses.filter(addr => user.shipToCode?.includes(addr.ShipToCode)).length > 0);
    }
)

export const selectShipToByCode = createSelector(
    [selectPermittedShipToAddresses, (state, shipToCode:string|null) => shipToCode],
    (shipToAddresses, shipToCode) => {
        const [shipTo] = shipToAddresses.filter(st => st.ShipToCode === shipToCode);
        return shipTo ?? null;
    }
)
