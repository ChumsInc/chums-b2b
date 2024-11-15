import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {SortProps} from "b2b-types";
import {fetchCarts} from "./api";
import {RootState} from "@app/configureStore";
import {deleteCart, deleteCartItem, fetchCart, postAddToCart, putCart, putUpdateCartItem} from "@ducks/carts/api";
import {selectCartsStatus, selectCartStatusById} from "@ducks/carts/selectors";
import {B2BCartHeader} from "@typeDefs/cart/cart-header";
import {B2BCart} from "@typeDefs/cart/cart";
import {AddToCartProps, CartActionProps, UpdateCartItemProps, UpdateCartProps} from "@typeDefs/cart/cart-action-props";

export const setCartsSearch = createAction<string>("carts/setSearch");
export const setCartsSort = createAction<SortProps<B2BCartHeader>>("carts/setSort");
export const loadCarts = createAsyncThunk<B2BCartHeader[], string | null, { state: RootState }>(
    'carts/loadCarts',
    async (arg) => {
        return await fetchCarts(arg!);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !!arg && selectCartsStatus(state) === 'idle'
        }
    }
)


export const loadCart = createAsyncThunk<B2BCart | null, CartActionProps, { state: RootState }>(
    'carts/loadCart',
    async (arg) => {
        return await fetchCart(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectCartStatusById(state, arg.cartId) === 'idle';
        }
    }
)

export const saveCart = createAsyncThunk<B2BCart | null, UpdateCartProps, { state: RootState }>(
    'carts/saveCart',
    async (arg) => {
        return await putCart(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !!arg.cartId && selectCartStatusById(state, arg.cartId) === 'idle'
        }
    }
)

export const removeCart = createAsyncThunk<B2BCartHeader[], CartActionProps, { state: RootState }>(
    'carts/removeCart',
    async (arg) => {
        return await deleteCart(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !!arg.cartId && selectCartStatusById(state, arg.cartId) === 'idle'
        }
    }
)

export const addToCart = createAsyncThunk<B2BCart | null, AddToCartProps, { state: RootState }>(
    'carts/addToCart',
    async (arg) => {
        return await postAddToCart(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return (arg.body.itemType === '4' || +arg.body.quantityOrdered > 0)
                && (!arg.cartId || selectCartStatusById(state, arg.cartId) === 'idle')
        }
    }
)

export const updateCartItem = createAsyncThunk<B2BCart | null, UpdateCartItemProps, { state: RootState }>(
    'carts/updateCartItem',
    async (arg) => {
        if (arg.body.quantityOrdered === 0) {
            return await deleteCartItem(arg)
        }
        return await putUpdateCartItem(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !!arg.cartId
                && !!arg.cartItemId
                && selectCartStatusById(state, arg.cartId) === 'idle'
        }
    }
)
