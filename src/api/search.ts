import type {SearchResult} from "chums-types/b2b";
import {fetchJSON} from "./fetch.js";

export const API_PATH_SEARCH = '/api/search/v3/:term';

export async function fetchSearchResults(arg: string): Promise<SearchResult[]> {
    try {
        const params = new URLSearchParams();
        params.set('term', arg);
        const url = `/api/search.json?${params.toString()}`;
        const response = await fetchJSON<SearchResult[]>(url);
        return response ?? [];
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("fetchSearchResults()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchSearchResults()", err);
        return Promise.reject(new Error('Error in fetchSearchResults()'));
    }
}
