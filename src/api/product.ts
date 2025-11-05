import type {Product} from "chums-types/b2b";
import {fetchJSON} from "./fetch";


export async function fetchProduct(arg:string):Promise<Product|null> {
    try {
        const url = '/api/products/v2/keyword/:keyword.json'
            .replace(':keyword', encodeURIComponent(arg));
        const res = await fetchJSON<{products: Product[]}>(url, {cache: 'no-cache'});
        const [product] = (res?.products ?? []);
        return product ?? null;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchProduct()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchProduct()", err);
        return Promise.reject(new Error('Error in fetchProduct()'));
    }
}

