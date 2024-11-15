import {fetchJSON} from "@api/fetch";
import {
    AddToCartProps,
    CartActionProps,
    DeleteCartItemProps,
    UpdateCartItemProps,
    UpdateCartProps
} from "@typeDefs/cart/cart-action-props";
import {B2BCartHeader} from "@typeDefs/cart/cart-header";
import {B2BCart} from "@typeDefs/cart/cart";

export async function fetchCarts(arg: string): Promise<B2BCartHeader[]> {
    try {

        const url = `/api/carts/:customerSlug.json`
            .replace(':customerSlug', encodeURIComponent(arg));
        const res = await fetchJSON<{ carts: B2BCartHeader[] }>(url, {cache: 'no-cache'});
        return res.carts ?? [];
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("fetchCarts()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchCarts()", err);
        return Promise.reject(new Error('Error in fetchCarts()'));
    }
}


export async function fetchCart(arg: CartActionProps): Promise<B2BCart | null> {
    try {
        const url = '/api/carts/:customerKey/:cartId.json'
            .replace(':customerKey', encodeURIComponent(arg.customerKey!))
            .replace(':cartId', encodeURIComponent(arg.cartId));
        const res = await fetchJSON<{ cart: B2BCart }>(url, {cache: 'no-cache'});
        return res?.cart ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("fetchCart()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchCart()", err);
        return Promise.reject(new Error('Error in fetchCart()'));
    }
}


export async function putCart(arg: UpdateCartProps): Promise<B2BCart | null> {
    try {
        const url = '/api/carts/:customerKey/:cartId.json'
            .replace(':customerKey', encodeURIComponent(arg.customerKey!))
            .replace(':cartId', encodeURIComponent(arg.cartId));
        const res = await fetchJSON<{ cart: B2BCart }>(url, {method: 'PUT', body: JSON.stringify(arg.body)});
        return res?.cart ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("putCart()", err.message);
            return Promise.reject(err);
        }
        console.debug("putCart()", err);
        return Promise.reject(new Error('Error in putCart()'));
    }
}


export async function postAddToCart(arg: AddToCartProps): Promise<B2BCart | null> {
    try {
        const url = '/api/carts/:customerKey/:cartId/cart.json'
            .replace(':customerKey', encodeURIComponent(arg.customerKey!))
            .replace(':cartId', encodeURIComponent(arg.cartId ?? 'new'))
        const res = await fetchJSON<{ cart: B2BCart }>(url, {method: 'POST', body: JSON.stringify(arg.body)});
        return res?.cart ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("postAddToCart()", err.message);
            return Promise.reject(err);
        }
        console.debug("postAddToCart()", err);
        return Promise.reject(new Error('Error in postAddToCart()'));
    }
}


export async function putUpdateCartItem(arg: UpdateCartItemProps): Promise<B2BCart | null> {
    try {
        const url = '/api/carts/:customerKey/:cartId/:cartItemId.json'
            .replace(':customerKey', encodeURIComponent(arg.customerKey!))
            .replace(':cartId', encodeURIComponent(arg.cartId))
            .replace(':cartItemId', encodeURIComponent(arg.cartItemId));
        const res = await fetchJSON<{ cart: B2BCart }>(url, {method: 'PUT', body: JSON.stringify(arg.body)});
        return res?.cart ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("putUpdateCartItem()", err.message);
            return Promise.reject(err);
        }
        console.debug("putUpdateCartItem()", err);
        return Promise.reject(new Error('Error in putUpdateCartItem()'));
    }
}

export async function deleteCartItem(arg: DeleteCartItemProps): Promise<B2BCart | null> {
    try {
        const url = '/api/carts/:customerKey/:cartId/:cartItemId.json'
            .replace(':customerKey', encodeURIComponent(arg.customerKey!))
            .replace(':cartId', encodeURIComponent(arg.cartId))
            .replace(':cartItemId', encodeURIComponent(arg.cartItemId));
        const res = await fetchJSON<{ cart: B2BCart }>(url, {method: 'DELETE'});
        return res?.cart ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("deleteCartItem()", err.message);
            return Promise.reject(err);
        }
        console.debug("deleteCartItem()", err);
        return Promise.reject(new Error('Error in deleteCartItem()'));
    }
}

export async function deleteCart(arg: CartActionProps): Promise<B2BCartHeader[]> {
    try {
        const url = '/api/carts/:customerKey/:cartId.json'
            .replace(':customerKey', encodeURIComponent(arg.customerKey!))
            .replace(':cartId', encodeURIComponent(arg.cartId));
        const res = await fetchJSON<{ carts: B2BCartHeader[] }>(url, {method: 'DELETE'});
        return res?.carts ?? [];
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("deleteCart()", err.message);
            return Promise.reject(err);
        }
        console.debug("deleteCart()", err);
        return Promise.reject(new Error('Error in deleteCart()'));
    }
}
