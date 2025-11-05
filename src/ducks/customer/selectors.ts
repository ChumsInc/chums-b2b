import {createSelector} from "@reduxjs/toolkit";
import {isBillToCustomer} from "@/utils/typeguards";
import {type RootState} from "@/app/configureStore";
import {hasBillToAccess} from "./utils";
import {selectCurrentAccess} from "@/ducks/user/userAccessSlice";
import {selectCustomerPermissions} from "@/ducks/customer/customerPermissionsSlice";
import type {ShipToCustomer} from "chums-types/b2b";
import {selectPermittedShipToAddresses} from "@/ducks/customer/customerShipToAddressSlice";

export const selectCustomerKey = (state: RootState) => state.customer.key;
export const selectCustomerAccount = (state: RootState) => state.customer.account ?? null;
export const selectTaxSchedule = (state: RootState) => isBillToCustomer(state.customer.account) ? (state.customer.account?.TaxSchedule ?? '') : '';
export const selectCustomerLoading = (state: RootState) => state.customer.loading ?? false;
export const selectCustomerLoadStatus = (state: RootState) => state.customer.loadStatus;
export const selectCustomerSaving = (state: RootState) => state.customer.saving ?? false;
export const selectCustomerLoaded = (state: RootState) => state.customer.loaded ?? false;

export const selectCustomerReturnToPath = (state: RootState) => state.customer.returnToPath;

export const selectPermittedBillToAddress = createSelector(
    [selectCustomerPermissions, selectCurrentAccess, selectCustomerAccount],
    (permissions, access, customer) => {
        return permissions?.billTo && hasBillToAccess(access, customer);
    }
)

export const selectPrimaryShipTo = createSelector(
    [selectCustomerAccount, selectPermittedShipToAddresses, selectCustomerPermissions],
    (account, shipToAddresses, permissions): ShipToCustomer | null => {
        if (!permissions?.billTo || !isBillToCustomer(account)) {
            return null;
        }
        const [shipTo] = shipToAddresses.filter(st => st.ShipToCode === account.PrimaryShipToCode);
        return shipTo ?? null;
    }
)
