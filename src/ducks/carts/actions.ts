import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import type {EmailResponse} from "chums-types/b2b";
import {
    fetchCarts,
    fetchNextShipDate,
    postCartEmail,
    postDuplicateSalesOrder,
    postProcessCart,
    putUpdateCartItems
} from "./api";
import {type RootState} from "@/app/configureStore";
import {deleteCart, deleteCartItem, fetchCart, postAddToCart, putCart, putUpdateCartItem} from "@/ducks/carts/api";
import type {B2BCartHeader} from "@/types/cart/cart-header";
import type {B2BCart} from "@/types/cart/cart";
import type {
    AddToCartProps,
    CartActionProps,
    DuplicateCartProps,
    PromoteCartBody,
    UpdateCartItemProps,
    UpdateCartProps
} from "@/types/cart/cart-action-props";
import type {CustomerShippingAccount} from "@/types/customer";
import localStore from "@/utils/LocalStore";
import {STORE_CURRENT_CART, STORE_CUSTOMER_SHIPPING_ACCOUNT} from "@/constants/stores";
import {selectUserType} from "@/ducks/user/userProfileSlice";
import {selectCartsStatus, selectCartStatusById} from "@/ducks/carts/cartStatusSlice";
import {selectCartDetailById} from "@/ducks/carts/cartDetailSlice";
import {selectCartShippingAccount} from "@/ducks/carts/activeCartSlice";
import {canStorePreferences} from "@/ducks/cookie-consent/utils";

export const loadCarts = createAsyncThunk<B2BCart[], string | null, { state: RootState }>(
    'carts/loadCarts',
    async (arg) => {
        const carts = await fetchCarts(arg!);
        const _cartId = localStore.getItem<number | null>(STORE_CURRENT_CART, null);
        if (_cartId && !carts.filter(c => c.header.id === _cartId).length) {
            localStore.removeItem(STORE_CURRENT_CART);
        }
        return carts;
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
        const cart = await fetchCart(arg);
        if (cart && arg.setActiveCart) {
            localStore.setItem<number>(STORE_CURRENT_CART, cart.header.id);
        } else if (!cart) {
            const currentCart = localStore.getItem<number | null>(STORE_CURRENT_CART, null);
            if (currentCart === arg.cartId) {
                localStore.removeItem(STORE_CURRENT_CART);
            }
        }
        return cart;
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
    async (arg, {getState}) => {
        const state = getState();
        const detail = selectCartDetailById(state, arg.cartId);
        const items = detail.filter(line => line.changed)
            .map(line => {
                return {
                    id: line.id,
                    quantityOrdered: line.quantityOrdered,
                    commentText: line.commentText,
                    itemType: line.itemType,
                }
            });
        if (items.length > 0) {
            await putUpdateCartItems({...arg, items});
        }
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
            return (arg.item.itemType === '4' || +arg.item.quantityOrdered > 0)
                && (!arg.cartId || selectCartStatusById(state, arg.cartId) === 'idle')
        }
    }
)

export const saveCartItem = createAsyncThunk<B2BCart | null, UpdateCartItemProps, { state: RootState }>(
    'carts/saveCartItem',
    async (arg) => {
        if (arg.item.quantityOrdered === 0) {
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

export const sendCartEmail = createAsyncThunk<EmailResponse | null, CartActionProps, { state: RootState }>(
    'carts/sendEmail',
    async (arg) => {
        return await postCartEmail(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectCartStatusById(state, arg.cartId) === 'idle';
        }
    }
)

export const setActiveCartId = createAction('activeCart/setActiveCartId', (arg: number | null) => {
    if (arg) {
        localStore.setItem(STORE_CURRENT_CART, arg)
    } else {
        localStore.removeItem(STORE_CURRENT_CART);
    }
    return {
        payload: arg
    }
})

export const setCartShippingAccount = createAction('activeCart/setCartShippingAccount', (arg: CustomerShippingAccount | null) => {
    if (canStorePreferences()) {
        localStore.setItem<CustomerShippingAccount | null>(STORE_CUSTOMER_SHIPPING_ACCOUNT, arg);
    }
    return {
        payload: arg
    }
});

export const processCart = createAsyncThunk<string | null, B2BCartHeader, { state: RootState }>(
    'processCart',
    async (arg, {getState}) => {
        const state = getState();
        const shippingAccount = selectCartShippingAccount(state);
        const userType = selectUserType(state);
        const comment: string[] = [];
        if (shippingAccount?.enabled) {
            comment.push('RCP')
            comment.push(`${shippingAccount.value.trim()}`);
        }

        if (arg.CancelReasonCode?.toUpperCase() === 'HOLD') {
            comment.push('HOLD');
        } else {
            comment.push('SWR');
        }

        const FOB = [`SLC`, userType?.toUpperCase()?.slice(0, 1) ?? '']
            .filter(str => !!str)
            .join('~');
        const body: PromoteCartBody = {
            action: 'promote',
            cartId: arg.id,
            cartName: arg.customerPONo!,
            shipExpireDate: arg.shipExpireDate!,
            shipToCode: arg.shipToCode ?? '',
            shipVia: arg.shipVia ?? '',
            paymentType: arg.PaymentType!,
            comment: comment.join(' ~ '),
            promoCode: arg.promoCode ?? '',
            FOB,
        }
        return await postProcessCart(body);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !!arg.id && selectCartStatusById(state, arg.id) === 'idle'
        }
    }
);

export const duplicateSalesOrder = createAsyncThunk<B2BCart | null, DuplicateCartProps, { state: RootState }>(
    'carts/duplicateSalesOrder',
    async (arg) => {
        return await postDuplicateSalesOrder(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !!arg.salesOrderNo && selectCartStatusById(state, 0) === 'idle'
        }
    }
)

export const loadNextShipDate = createAsyncThunk<string|null, void, {state:RootState}>(
    'carts/loadNextShipDate',
    async () => {
        return await fetchNextShipDate();
    }
)
