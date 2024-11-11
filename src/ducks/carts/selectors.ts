import {RootState} from "../../app/configureStore";
import {createSelector} from "@reduxjs/toolkit";
import {cartsSorter} from "./utils";

export const selectCartsList = (state:RootState) => state.carts.list;
export const selectCartsStatus = (state:RootState) => state.carts.status;
export const selectCartsSort = (state:RootState) => state.carts.sort;
export const selectCartsSearch = (state:RootState) => state.carts.search

export const selectFilteredCarts = createSelector(
    [selectCartsList, selectCartsSearch, selectCartsSort],
    (list, search, sort) => {
        return list.filter(cart => !search.trim()
            || cart.id.toString().includes(search.trim())
            || (cart.salesOrderNo ?? '').toLowerCase().includes(search.trim().toLowerCase())
            || (cart.customerPONo ?? '').toLowerCase().includes(search.trim().toLowerCase())
        )
            .sort(cartsSorter(sort));
    }
)
