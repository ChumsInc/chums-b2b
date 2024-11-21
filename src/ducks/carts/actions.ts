import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {EmailResponse, SalesOrderHeader, SortProps} from "b2b-types";
import {fetchCarts, postCartEmail, putUpdateCartItems} from "./api";
import {RootState} from "@app/configureStore";
import {deleteCart, deleteCartItem, fetchCart, postAddToCart, putCart, putUpdateCartItem} from "@ducks/carts/api";
import {selectCartDetailById, selectCartsStatus, selectCartStatusById} from "@ducks/carts/selectors";
import {B2BCartHeader} from "@typeDefs/cart/cart-header";
import {B2BCart} from "@typeDefs/cart/cart";
import {
    AddToCartProps,
    CartActionProps,
    UpdateCartItemProps,
    UpdateCartItemsProps,
    UpdateCartProps
} from "@typeDefs/cart/cart-action-props";
import {B2BCartDetail} from "@typeDefs/cart/cart-detail";
import {postOrderEmail} from "@api/sales-order";
import {selectLoggedIn} from "@ducks/user/selectors";
import {selectSalesOrder, selectSendEmailStatus} from "@ducks/open-orders/selectors";

export const setCartsSearch = createAction<string>("carts/setSearch");
export const setCartsSort = createAction<SortProps<B2BCartHeader>>("carts/setSort");
export const setCartItem = createAction<Partial<B2BCartDetail> & Pick<B2BCartDetail, 'id'|'cartHeaderId'>>('carts/setCartItem')

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
            return (arg.body.itemType === '4' || +arg.body.quantityOrdered > 0)
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

export const sendCartEmail = createAsyncThunk<EmailResponse | null, CartActionProps>(
    'open-orders/sendEmail',
    async (arg) => {
        return await postCartEmail(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() as RootState;
            return selectCartStatusById(state, arg.cartId) === 'idle';
        }
    }
)
