import type {ItemSearchResult} from "@/ducks/item-lookup";
import {fetchJSON} from "./fetch";
import debug from "@/utils/debug.ts";

export async function fetchItemLookup(arg:string):Promise<ItemSearchResult[]> {
    try {
        if (!arg || !arg.trim()) {
            return [];
        }
        const url = `/api/search/items/${encodeURIComponent(arg)}`;
        const res = await fetchJSON<{items: ItemSearchResult[]}>(url);
        return res?.items ?? [];
    } catch(err:unknown) {
        if (err instanceof Error) {
            debug("fetchItemLookup()", err.message);
            return Promise.reject(err);
        }
        debug("fetchItemLookup()", err);
        return Promise.reject(new Error('Error in fetchItemLookup()'));
    }
}
