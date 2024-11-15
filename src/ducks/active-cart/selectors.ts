import {RootState} from "@app/configureStore";

export const selectCartId = (state: RootState) => state.activeCart.cartId ?? 0;
export const selectCartPromoCode = (state: RootState) => state.activeCart.promoCode;
export const selectCartDetailSort = (state: RootState) => state.activeCart.sort;
export const selectCartStatus = (state: RootState) => state.activeCart.status;
export const selectCartProgress = (state: RootState) => state.activeCart.progress;
export const selectCartShipDate = (state: RootState) => state.activeCart.shipDate;
export const selectCartShippingAccount = (state: RootState) => state.activeCart.shippingAccount;
export const selectCartMessage = (state: RootState) => state.activeCart.cartMessage;
