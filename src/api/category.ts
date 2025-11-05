import {fetchJSON} from "./fetch";
import type {ProductCategory} from "chums-types/b2b";

export async function fetchCategory(keyword: string): Promise<ProductCategory | null> {
    try {
        if (!keyword) {
            return null;
        }
        const url = `/api/products/v2/category/${encodeURIComponent(keyword)}.json`
        const response = await fetchJSON<{ categories: ProductCategory[] }>(url, {cache: 'no-cache'});
        return response?.categories?.[0] ?? null;
    } catch (err) {
        if (err instanceof Error) {
            console.debug(fetchCategory.name, err.message);
            return Promise.reject(err);
        }
        console.debug(fetchCategory.name, err);
        return Promise.reject(new Error('Error in fetchCategory()'));
    }
}
