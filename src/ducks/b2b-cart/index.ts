import {B2BCartDetail, B2BCartHeader} from "@typeDefs/carts";
import {CustomerKey, SortProps} from "b2b-types";
import {CartProgress, cartProgress_Cart} from "@typeDefs/cart";
import {CustomerShippingAccount} from "@typeDefs/customer";
import {nextShipDate} from "@utils/orders";
import localStore from "@utils/LocalStore";
import {STORE_CUSTOMER_SHIPPING_ACCOUNT} from "@constants/stores";
import {createReducer} from "@reduxjs/toolkit";
import {setCartProgress, setShipDate} from "@ducks/cart/actions";
import {CART_PROGRESS_STATES, NEW_CART} from "@constants/orders";
import {setCustomerAccount} from "@ducks/customer/actions";
import {setLoggedIn} from "@ducks/user/actions";
import {loadCarts} from "@ducks/carts/actions";
import {customerSlug} from "@utils/customer";

export interface B2BCartState {
    customerKey: CustomerKey|null;
    cartId: number|null;
    cartName: string;
    cartQuantity: number|null;
    cartTotal: number|string;
    promoCode: string | null;
    header: B2BCartHeader|null;
    detail: B2BCartDetail[];
    sort:SortProps<B2BCartDetail>;
    status: 'idle'|'loading'|'saving'|'rejected';
    progress: CartProgress;
    shipDate: string;
    shippingAccount: CustomerShippingAccount;
    cartMessage: string;
}

export const initialB2BCartState = (): B2BCartState => ({
    customerKey: null,
    cartId: null,
    cartName: '',
    cartQuantity: null,
    cartTotal: 0,
    promoCode: null,
    header: null,
    detail: [],
    sort: {field: 'id', ascending: true},
    status: 'idle',
    progress: cartProgress_Cart,
    shipDate: nextShipDate(),
    shippingAccount: {
        enabled: localStore.getItem<CustomerShippingAccount | null>(STORE_CUSTOMER_SHIPPING_ACCOUNT, null)?.enabled ?? false,
        value: localStore.getItem<CustomerShippingAccount | null>(STORE_CUSTOMER_SHIPPING_ACCOUNT, null)?.value ?? '',
    },
    cartMessage: '',
})



const b2bCartReducer = createReducer(initialB2BCartState, builder => {
    builder
        .addCase(setCartProgress, (state, action) => {
            state.progress = action.payload ?? CART_PROGRESS_STATES.cart;
        })
        .addCase(setShipDate, (state, action) => {
            localStore.setItem(STORE_CUSTOMER_SHIPPING_ACCOUNT, action.payload);
            state.shipDate = action.payload ?? nextShipDate();
        })
        .addCase(setCustomerAccount.fulfilled, (state) => {
            state.cartId = null;
            state.cartName = '';
            state.cartTotal = 0;
            state.cartQuantity = 0;
        })
        .addCase(setLoggedIn, (state, action) => {
            if (!action.payload?.loggedIn) {
                state.cartId = null;
                state.cartName = '';
                state.cartTotal = 0;
                state.cartQuantity = null;
                state.header = null;
                state.detail = [];
                state.progress = CART_PROGRESS_STATES.cart;
            }
        })
        .addCase(loadCarts.pending, (state, action) => {
            if (customerSlug(state.customerKey) !== customerSlug(action.meta.arg)) {
                state.customerKey = action.meta.arg;
                state.cartId = null;
                state.cartName = '';
                state.cartTotal = 0;
                state.cartQuantity = null;
                state.header = null;
                state.detail = [];
                state.progress = CART_PROGRESS_STATES.cart;
            }
        })
        .addCase(loadCarts.fulfilled, (state, action) => {
            const [cart] = action.payload.filter(cart => !state.cartId || cart.id === state.cartId);
            state.progress = CART_PROGRESS_STATES.cart;
            if (!cart) {
                state.cartId = null;
                state.cartName = '';
                state.cartTotal = 0;
                state.cartQuantity = null;
                state.header = null;
                state.detail = [];
            } else {
                if (state.cartId !== cart.id) {
                    state.cartQuantity = null;
                    state.detail = [];
                }
                state.cartId = cart.id;
                state.cartName = cart.customerPONo ?? '';
                state.header = cart;
                state.cartTotal = cart.subTotalAmt;
            }
        })


});

export default b2bCartReducer;
