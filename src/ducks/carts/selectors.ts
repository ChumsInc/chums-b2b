import {RootState} from "@app/configureStore";
import {createSelector} from "@reduxjs/toolkit";
import {cartsSorter} from "./utils";

export const selectCartsList = (state: RootState) => state.carts.list;
export const selectCartsIndexes = (state: RootState) => state.carts.indexes;
export const selectCartsStatus = (state: RootState) => state.carts.status;
export const selectCartsSort = (state: RootState) => state.carts.sort;
export const selectCartsSearch = (state: RootState) => state.carts.search;
export const selectCartIdHelper = (state: RootState, cartId: number) => cartId;

export const selectCartsLength = createSelector(
    [selectCartsIndexes],
    (indexes) => indexes.length,
)

export const selectCartById = createSelector(
    [selectCartsList, selectCartIdHelper],
    (list, cartId) => {
        return list[cartId] ?? null;
    }
)

export const selectCartHeaderById = createSelector(
    [selectCartsList, selectCartIdHelper],
    (list, cartId) => {
        if (!cartId) {
            return null;
        }
        return list[cartId]?.header ?? null;
    }
)

export const selectCartDetailById = createSelector(
    [selectCartsList, selectCartIdHelper],
    (list, cartId) => {
        return list[cartId]?.detail ?? [];
    }
)

export const selectCartItemCountById = createSelector(
    [selectCartsList, selectCartIdHelper],
    (list, cartId) => {
        return list[cartId]?.detail
            .filter(item => item.itemType === '1')
            .map(item => item.quantityOrdered)
    }
)

export const selectCartStatusById = createSelector(
    [selectCartsList, selectCartIdHelper],
    (list, cartId) => {
        return list[cartId]?.status ?? 'idle';
    }
)

export const selectCartHeaders = createSelector(
    [selectCartsList, selectCartsIndexes],
    (list, indexes) => {
        return indexes
            .map(cartId => list[cartId].header)
            .filter(cart => !!cart);
    }
)

export const selectFilteredCarts = createSelector(
    [selectCartHeaders, selectCartsSearch, selectCartsSort],
    (list, search, sort) => {
        return list
            .filter(cart => !search.trim()
                || cart.id.toString().includes(search.trim())
                || (cart.salesOrderNo ?? '').toLowerCase().includes(search.trim().toLowerCase())
                || (cart.customerPONo ?? '').toLowerCase().includes(search.trim().toLowerCase())
            )
            .sort(cartsSorter(sort));
    }
)

export const selectCartHasChanges = createSelector(
    [selectCartIdHelper, selectCartDetailById],
    (cartId, detail) => {
        return detail.reduce((pv, cv) => cv.changed ?? pv, false)
    }
);
