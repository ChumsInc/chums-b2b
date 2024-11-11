import {B2BCartHeader} from "@typeDefs/carts";
import {fetchJSON} from "@api/fetch";
import {CustomerKey} from "b2b-types";
import {customerSlug} from "@utils/customer";

export async function fetchCarts(arg:CustomerKey):Promise<B2BCartHeader[]> {
    try {

        const url = `/api/carts/:customerSlug.json`
            .replace(':customerSlug', encodeURIComponent(customerSlug(arg)!));
        const res = await fetchJSON<{carts: B2BCartHeader[]}>(url, {cache: 'no-cache'});
        return res.carts ?? [];
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchCarts()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchCarts()", err);
        return Promise.reject(new Error('Error in fetchCarts()'));
    }
}
