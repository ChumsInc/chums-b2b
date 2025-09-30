import {allowErrorResponseHandler, fetchJSON} from "@/api/fetch";
import {
    AddToCartBody,
    AddToCartProps,
    CartActionProps,
    DeleteCartItemProps,
    DuplicateCartProps,
    PromoteCartBody,
    UpdateCartItemProps,
    UpdateCartItemsProps,
    UpdateCartProps
} from "@/types/cart/cart-action-props";
import {B2BCartHeader} from "@/types/cart/cart-header";
import {B2BCart} from "@/types/cart/cart";
import {EmailResponse} from "b2b-types";

export async function fetchCarts(arg: string): Promise<B2BCart[]> {
    try {

        const url = `/api/carts/:customerSlug.json`
            .replace(':customerSlug', encodeURIComponent(arg));
        const res = await fetchJSON<{ carts: B2BCart[] }>(url, {cache: 'no-cache'});
        return res?.carts ?? [];
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
        const body: AddToCartBody = {...arg.item};
        if (!arg.cartId) {
            body.customerPONo = arg.cartName;
            body.shipToCode = arg.shipToCode;
        }
        const res = await fetchJSON<{ cart: B2BCart }>(url, {method: 'POST', body: JSON.stringify(body)});
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
        const res = await fetchJSON<{ cart: B2BCart }>(url, {method: 'PUT', body: JSON.stringify(arg.item)});
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

export async function putUpdateCartItems(arg: UpdateCartItemsProps): Promise<B2BCart | null> {
    try {
        const url = '/api/carts/:customerKey/:cartId/items.json'
            .replace(':customerKey', encodeURIComponent(arg.customerKey!))
            .replace(':cartId', encodeURIComponent(arg.cartId));
        const body = JSON.stringify({items: arg.items});
        const res = await fetchJSON<{ cart: B2BCart }>(url, {method: 'PUT', body});
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
        if (arg.salesOrderNo) {
            const params = new URLSearchParams();
            params.set('cartId', arg.cartId.toString());
            params.set('salesOrderNo', arg.salesOrderNo);
            const url = `/sage/b2b/cart-sync/delete-cart.php?${params.toString()}`;
            await fetchJSON(url, {method: 'DELETE'}, allowErrorResponseHandler);
            console.log('removed sage quote', arg.salesOrderNo);
        }
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


export async function postCartEmail(arg: CartActionProps): Promise<EmailResponse | null> {
    try {
        const url = '/api/carts/:customerKey/:cartId/email.json'
            .replace(':customerKey', encodeURIComponent(arg.customerKey!))
            .replace(':cartId', encodeURIComponent(arg.cartId));
        const res = await fetchJSON<{ result: EmailResponse }>(url, {method: 'POST'});
        return res?.result ?? null
    } catch (err) {
        if (err instanceof Error) {
            console.debug("postCartEmail()", err.message);
            return Promise.reject(err);
        }
        console.debug("postCartEmail()", err);
        return Promise.reject(new Error('Error in postCartEmail()'));
    }
}

export async function postProcessCart(arg: PromoteCartBody): Promise<string | null> {
    try {
        const params = new URLSearchParams();
        params.set('cartId', arg.cartId.toString());
        if (window.location.hostname === 'localhost') {
            params.set('debug', '1');
        }
        const body = JSON.stringify(arg);
        const url = `/sage/b2b/cart-sync/sync-to-sage.php?${params.toString()}`;
        const res = await fetchJSON<{ salesOrderNo: string }>(url, {method: 'POST', body});
        return res?.salesOrderNo ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("postProcessCart()", err.message);
            return Promise.reject(err);
        }
        console.debug("postProcessCart()", err);
        return Promise.reject(new Error('Error in postProcessCart()'));
    }
}

export async function postDuplicateSalesOrder(arg: DuplicateCartProps): Promise<B2BCart | null> {
    try {
        const {customerKey, salesOrderNo, ...body} = arg;
        const url = '/api/carts/:customerKey/duplicate/:salesOrderNo.json'
            .replace(':customerKey', encodeURIComponent(customerKey!))
            .replace(':salesOrderNo', encodeURIComponent(salesOrderNo));
        const res = await fetchJSON<{ cart: B2BCart }>(url, {method: 'POST', body: JSON.stringify(body)});
        return res?.cart ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("postDuplicateSalesOrder()", err.message);
            return Promise.reject(err);
        }
        console.debug("postDuplicateSalesOrder()", err);
        return Promise.reject(new Error('Error in postDuplicateSalesOrder()'));
    }
}

export async function fetchNextShipDate():Promise<string|null> {
    try {
        const url = '/api/carts/next-ship-date.json';
        const res = await fetchJSON<{ nextShipDate: string }>(url, {method: 'GET', cache: 'no-cache'});
        return res?.nextShipDate ?? null;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchNextShipDate()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchNextShipDate()", err);
        return Promise.reject(new Error('Error in fetchNextShipDate()'));
    }
}
