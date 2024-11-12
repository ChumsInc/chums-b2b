import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {
    AddToCartProps,
    B2BCart, B2BCartDetail,
    B2BCartHeader,
    CartActionProps,
    UpdateCartItemProps,
    UpdateCartProps
} from "@typeDefs/carts";
import {
    deleteCart,
    deleteCartItem,
    fetchCart,
    postAddToCart,
    putCart,
    putUpdateCartItem,
} from "@ducks/b2b-cart/api";
import {RootState} from "@app/configureStore";
import {selectCartStatus} from "@ducks/b2b-cart/selectors";
import {CustomerShippingAccount} from "@typeDefs/customer";
import {CartProgress} from "@typeDefs/cart";
import {SortProps} from "b2b-types";

export const setCartShippingAccount = createAction<CustomerShippingAccount|null>('b2b-cart/setCartShippingAccount');
export const setCartCheckoutProgress = createAction<CartProgress>('b2b-cart/setCartCheckoutProgress');
export const setShipDate = createAction<string>('b2b-cart/setShipDate');
export const setCartDetailSort = createAction<SortProps<B2BCartDetail>>('b2b-cart/setCartDetailSort');

export const loadCart = createAsyncThunk<B2BCart | null, CartActionProps, { state: RootState }>(
    'b2b-cart/loadCart',
    async (arg) => {
        return await fetchCart(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectCartStatus(state) === 'idle';
        }
    }
)

export const saveCart = createAsyncThunk<B2BCart | null, UpdateCartProps, { state: RootState }>(
    'b2b-cart/saveCart',
    async (arg) => {
        return await putCart(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !!arg.cartId && selectCartStatus(state) === 'idle'
        }
    }
)

export const removeCart = createAsyncThunk<B2BCartHeader[], CartActionProps, { state: RootState }>(
    'b2b-cart/removeCart',
    async (arg) => {
        return await deleteCart(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !!arg.cartId && selectCartStatus(state) === 'idle'
        }
    }
)

export const addToCart = createAsyncThunk<B2BCart | null, AddToCartProps, { state: RootState }>(
    'b2b-cart/addToCart',
    async (arg) => {
        return await postAddToCart(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return (arg.body.itemType === '4' || +arg.body.quantityOrdered > 0) && selectCartStatus(state) === 'idle'
        }
    }
)

export const updateCartItem = createAsyncThunk<B2BCart | null, UpdateCartItemProps, { state: RootState }>(
    'b2b-cart/updateCartItem',
    async (arg) => {
        if (arg.body.quantityOrdered === 0) {
            return await deleteCartItem(arg)
        }
        return await putUpdateCartItem(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !!arg.cartId && !!arg.cartItemId && selectCartStatus(state) === 'idle'
        }
    }
)
