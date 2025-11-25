import {type CaseReducer, createSlice} from "@reduxjs/toolkit";
import type {CustomerShippingAccount} from "@/types/customer";
import localStore from "@/utils/LocalStore";
import {STORE_CUSTOMER_SHIPPING_ACCOUNT} from "@/constants/stores";
import {
    addToCart,
    duplicateSalesOrder,
    loadCart,
    loadCarts,
    loadNextShipDate,
    processCart,
    setActiveCartId,
    setCartShippingAccount
} from "@/ducks/carts/actions";
import {loadCustomer} from "@/ducks/customer/actions";
import {customerSlug} from "@/utils/customer";
import {initializeActiveCartState} from "@/ducks/carts/utils";


export interface ActiveCartExtraState {
    customerKey: string | null;
    cartId: number | null;
    promoCode: string | null;
    shippingAccount: CustomerShippingAccount | null;
    nextShipDate: string | null;
}


const clearActiveCart: CaseReducer<ActiveCartExtraState> = (state) => {
    state.cartId = null;
    state.promoCode = null;
    state.shippingAccount = localStore.getItem<CustomerShippingAccount | null>(STORE_CUSTOMER_SHIPPING_ACCOUNT, null);
    state.nextShipDate = null;
}

const activeCartSlice = createSlice({
    name: 'activeCart',
    initialState: initializeActiveCartState(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.fulfilled, (state, action) => {
                if (action.meta.arg.setActiveCart && action.payload) {
                    state.cartId = action.payload.header.id;
                }
            })
            .addCase(loadCart.pending, (state, action) => {
                if (action.meta.arg.setActiveCart) {
                    state.cartId = action.meta.arg.cartId;
                }
            })
            .addCase(loadCarts.pending, (state, action) => {
                if (state.customerKey !== action.meta.arg) {
                    state.customerKey = action.meta.arg;
                    state.cartId = null;
                }
            })
            .addCase(loadCarts.fulfilled, (state, action) => {
                if (!state.cartId && action.payload.length) {
                    state.cartId = action.payload[0].header.id;
                }
            })
            .addCase(loadCustomer.pending, (state, action) => {
                if (state.customerKey !== customerSlug(action.meta.arg)) {
                    state.customerKey = customerSlug(action.meta.arg);
                    state.cartId = null;
                }
            })
            .addCase(setActiveCartId, (state, action) => {
                state.cartId = action.payload;
            })
            .addCase(setCartShippingAccount, (state, action) => {
                state.shippingAccount = action.payload;
            })
            .addCase(processCart.fulfilled, (state, action) => {
                if (state.cartId === action.meta.arg.id) {
                    clearActiveCart(state, action);
                }
            })
            .addCase(duplicateSalesOrder.fulfilled, (state, action) => {
                if (action.payload) {
                    state.cartId = action.payload.header.id;
                }
            })
            .addCase(loadNextShipDate.fulfilled, (state, action) => {
                state.nextShipDate = action.payload;
            })

    },
    selectors: {
        selectActiveCartId: (state) => state.cartId ?? 0,
        selectCartPromoCode: (state) => state.promoCode,
        selectCartShippingAccount: (state) => state.shippingAccount,
        selectNextShipDate: (state) => state.nextShipDate,
    },
})

export const {
    selectActiveCartId,
    selectCartShippingAccount,
    selectCartPromoCode,
    selectNextShipDate,
} = activeCartSlice.selectors;

export default activeCartSlice;
