import {B2BCartDetail} from "@typeDefs/cart/cart-detail";
import {SortProps} from "b2b-types";
import {CartProgress} from "@typeDefs/cart/cart-utils";
import {CustomerShippingAccount} from "@typeDefs/customer";
import {nextShipDate} from "@utils/orders";
import localStore from "@utils/LocalStore";
import {STORE_CUSTOMER_SHIPPING_ACCOUNT} from "@constants/stores";
import {createReducer} from "@reduxjs/toolkit";
import {setCartProgress, setShipDate} from "@ducks/cart/actions";
import {CART_PROGRESS_STATES} from "@constants/orders";
import {setCustomerAccount} from "@ducks/customer/actions";
import {setLoggedIn} from "@ducks/user/actions";
import {loadCart, loadCarts} from "@ducks/carts/actions";
import {dismissContextAlert} from "@ducks/alerts/actions";
import {setCurrentCartId} from "@ducks/active-cart/actions";
import {cartProgress_Cart} from "@utils/cart";

export interface ActiveCartState {
    customerKey: string | null;
    cartId: number | null;
    promoCode: string | null;
    sort: SortProps<B2BCartDetail>;
    status: 'idle' | 'loading' | 'saving' | 'rejected';
    progress: CartProgress;
    shipDate: string;
    shippingAccount: CustomerShippingAccount;
    cartMessage: string;
}

export const initialActiveCartState = (): ActiveCartState => ({
    customerKey: null,
    cartId: null,
    promoCode: null,
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


const activeCartReducer = createReducer(initialActiveCartState, builder => {
    builder
        .addCase(setCartProgress, (state, action) => {
            state.progress = action.payload ?? CART_PROGRESS_STATES.cart;
        })
        .addCase(setShipDate, (state, action) => {
            localStore.setItem(STORE_CUSTOMER_SHIPPING_ACCOUNT, action.payload);
            state.shipDate = action.payload ?? nextShipDate();
        })
        .addCase(setCustomerAccount.pending, (state) => {
            state.cartId = null;
        })
        .addCase(setLoggedIn, (state, action) => {
            if (!action.payload?.loggedIn) {
                state.cartId = null;
                state.progress = CART_PROGRESS_STATES.cart;
            }
        })
        .addCase(loadCarts.pending, (state, action) => {
            if (state.customerKey !== action.meta.arg) {
                state.customerKey = action.meta.arg;
                state.cartId = null;
                state.progress = CART_PROGRESS_STATES.cart;
            }
        })
        .addCase(loadCarts.fulfilled, (state, action) => {
            const [cart] = action.payload.filter(cart => !state.cartId || cart.id === state.cartId);
            state.progress = CART_PROGRESS_STATES.cart;
            if (!cart) {
                state.cartId = null;
            } else {
                state.cartId = cart.id;
            }
        })
        .addCase(dismissContextAlert, (state, action) => {
            if (action.payload === loadCart.typePrefix) {
                state.status = 'idle';
            }
        })
        .addCase(setCurrentCartId, (state, action) => {
            state.cartId = action.payload;
        })


});

export default activeCartReducer;
