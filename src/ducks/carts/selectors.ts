import {RootState} from "@app/configureStore";
import {createSelector} from "@reduxjs/toolkit";
import {cartsSorter} from "./utils";
import {selectActiveCartId} from "@ducks/active-cart/selectors";
import Decimal from "decimal.js";

export const selectCartsList = (state: RootState) => state.carts.list;
export const selectCartsIndexes = (state: RootState) => state.carts.indexes;
export const selectCartsStatus = (state: RootState) => state.carts.status;
export const selectCartsSort = (state: RootState) => state.carts.sort;
export const selectCartsSearch = (state: RootState) => state.carts.search;
export const selectCartIdHelper = (state: RootState, cartId: number|null) => cartId;
export const selectCartItemIdHelper = (state: RootState, cartId: number|null, id: number|null) => id;
export const selectCartMessages = (state:RootState) => state.carts.messages;

export const selectCartsLength = createSelector(
    [selectCartsIndexes],
    (indexes) => indexes.length,
)

export const selectCartById = createSelector(
    [selectCartsList, selectCartIdHelper],
    (list, cartId) => {
        return list[cartId ?? 0] ?? null;
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
        return list[cartId ?? 0]?.detail ?? [];
    }
)

export const selectCartItemCountById = createSelector(
    [selectCartsList, selectCartIdHelper],
    (list, cartId) => {
        return list[cartId ?? 0]?.detail
            .filter(item => item.itemType === '1')
            .map(item => item.quantityOrdered)
    }
)

export const selectCartStatusById = createSelector(
    [selectCartsList, selectCartIdHelper],
    (list, cartId) => {
        return list[cartId ?? 0]?.status ?? 'idle';
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
    [selectCartDetailById],
    (detail) => {
        return detail.reduce((pv, cv) => cv.changed ?? pv, false)
    }
);

export const selectCartItemById = createSelector(
    [selectCartDetailById, selectCartItemIdHelper],
    (detail, id) => {
        const [line] = detail.filter(line => line.id === id);
        return line ?? null;
    }
)

export const selectCartItemStatus = createSelector(
    [selectCartById, selectCartItemIdHelper],
    (cart, id) => {
        return cart?.lineStatus?.[id ?? 0] ?? 'idle';
    }
)

export const selectCartTotal = createSelector(
    [selectCartById],
    (cart) => {
        return cart?.header?.subTotalAmt ?? null;
    }
)

export const selectActiveCart = createSelector(
    [selectActiveCartId, selectCartsList],
    (cartId, list) => {
        return list[cartId] ?? null;
    }
)

export const selectActiveCartHeader = createSelector(
    [selectActiveCartId, selectCartsList],
    (cartId, list) => {
        return list[cartId]?.header ?? null;
    }
)

export const selectActiveCartTotal = createSelector(
    [selectActiveCart],
    (cart) => {
        return cart?.header?.subTotalAmt ?? null;
    }
)

export const selectActiveCartQuantity = createSelector(
    [selectActiveCart],
    (cart) => {
        if (!cart) {
            return 0;
        }
        return cart.detail
            .filter(line => line.itemType === '1')
            .map(line => new Decimal(line.quantityOrdered).times(line.unitOfMeasureConvFactor))
            .reduce((pv, cv) => cv.add(pv), new Decimal(0))
            .toNumber();
    }
)

export const selectActiveCartLoading = createSelector(
    [selectActiveCart],
    (cart) => {
        if (!cart || !cart.status) {
            return false;
        }
        return cart?.status !== 'idle'
    }
)

