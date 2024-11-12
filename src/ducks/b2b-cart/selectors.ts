import {RootState} from "@app/configureStore";
import {createSelector} from "@reduxjs/toolkit";
import {cartDetailSorter} from "@ducks/b2b-cart/utils";

export const selectCartId = (state: RootState) => state.b2bCart.cartId;
export const selectCartName = (state: RootState) => state.b2bCart.cartName;
export const selectCartQuantity = (state: RootState) => state.b2bCart.cartQuantity;
export const selectCartTotal = (state: RootState) => state.b2bCart.cartTotal;
export const selectCartPromoCode = (state: RootState) => state.b2bCart.promoCode;
export const selectCartHeader = (state: RootState) => state.b2bCart.header;
export const selectCartDetail = (state: RootState) => state.b2bCart.detail;
export const selectCartDetailSort = (state: RootState) => state.b2bCart.sort;
export const selectCartStatus = (state: RootState) => state.b2bCart.status;
export const selectCartProgress = (state: RootState) => state.b2bCart.progress;
export const selectCartShipDate = (state: RootState) => state.b2bCart.shipDate;
export const selectCartShippingAccount = (state: RootState) => state.b2bCart.shippingAccount;
export const selectCartMessage = (state: RootState) => state.b2bCart.cartMessage;

export const selectSortedCartDetail = createSelector(
    [selectCartDetail, selectCartDetailSort],
    (list, sort) => {
        return [...list].sort(cartDetailSorter(sort));
    }
)

export const selectCartHasChanges = createSelector(
    [selectCartDetail],
    (detail) => {
        return detail.reduce((pv, cv) => cv.changed ?? pv, false)
    }
);
