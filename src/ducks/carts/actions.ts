import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {EmailResponse, SortProps} from "b2b-types";
import {fetchCarts, postCartEmail, postDuplicateSalesOrder, postProcessCart, putUpdateCartItems} from "./api";
import {RootState} from "@app/configureStore";
import {deleteCart, deleteCartItem, fetchCart, postAddToCart, putCart, putUpdateCartItem} from "@ducks/carts/api";
import {
    selectCartDetailById,
    selectCartShippingAccount,
    selectCartsStatus,
    selectCartStatusById
} from "@ducks/carts/selectors";
import {B2BCartHeader} from "@typeDefs/cart/cart-header";
import {B2BCart} from "@typeDefs/cart/cart";
import {
    AddToCartProps, AddToNewCartProps,
    CartActionProps, DuplicateCartProps,
    PromoteCartBody,
    UpdateCartItemProps,
    UpdateCartProps
} from "@typeDefs/cart/cart-action-props";
import {B2BCartDetail} from "@typeDefs/cart/cart-detail";
import {CustomerShippingAccount} from "@typeDefs/customer";
import {CartProgress} from "@typeDefs/cart/cart-utils";
import localStore from "@utils/LocalStore";
import {STORE_CUSTOMER_SHIPPING_ACCOUNT} from "@constants/stores";
import {Dayjs} from "dayjs";
import {nextShipDate} from "@utils/orders";
import {CREDIT_CARD_PAYMENT_TYPES} from "@constants/account";

export const setCartsSearch = createAction<string>("carts/setSearch");
export const setCartsSort = createAction<SortProps<B2BCartHeader>>("carts/setSort");
export const setCartItem = createAction<Partial<B2BCartDetail> & Pick<B2BCartDetail, 'id' | 'cartHeaderId'>>('carts/setCartItem');
export const clearCartMessages = createAction("carts/clearMessages");

export const loadCarts = createAsyncThunk<B2BCart[], string | null, { state: RootState }>(
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
    'open-orders/sendEmail',
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

export const setActiveCartId = createAction<number | null>('activeCart/setActiveCartId')
export const setCartShippingAccount = createAction('activeCart/setCartShippingAccount', (arg: CustomerShippingAccount | null) => {
    localStore.setItem<CustomerShippingAccount | null>(STORE_CUSTOMER_SHIPPING_ACCOUNT, arg);
    return {
        payload: arg
    }
});
export const setCartCheckoutProgress = createAction<CartProgress>('activeCart/setCartCheckoutProgress');
export const setCartShipDate = createAction('activeCart/setShipDate', (arg: Date | string | number | Dayjs) => {
    const shipDate = nextShipDate(arg);
    return {
        payload: shipDate,
    }
});
export const setCartDetailSort = createAction<SortProps<B2BCartDetail>>('activeCart/setCartDetailSort');

export const processCart = createAsyncThunk<string|null, B2BCartHeader, { state: RootState }>(
    'processCart',
    async (arg, {getState}) => {
        const state = getState();
        const shippingAccount = selectCartShippingAccount(state);
        const comment: string[] = [];
        if (shippingAccount.enabled) {
            comment.push(`COL ${shippingAccount.value}`);
        }

        if (arg.CancelReasonCode === 'hold') {
            comment.push('HOLD');
        } else {
            comment.push('SWR');
        }

        const body:PromoteCartBody = {
            action: 'promote',
            cartId: arg.id,
            cartName: arg.customerPONo!,
            shipExpireDate: arg.shipExpireDate!,
            shipToCode: arg.shipToCode ?? '',
            shipVia: arg.shipVia ?? '',
            paymentType: arg.PaymentType!,
            comment: comment.join(''),
            promoCode: arg.promoCode ?? '',
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

export const duplicateSalesOrder = createAsyncThunk<B2BCart|null, DuplicateCartProps, {state:RootState}>(
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
