import type {ContentPage} from "chums-types/b2b";
import {fetchJSON} from "./fetch";
import debug from "@/utils/debug.ts";

export async function fetchPage(arg: string): Promise<ContentPage | null> {
    try {
        const url = `/api/pages/${encodeURIComponent(arg)}.json`;
        const response = await fetchJSON<{ page: ContentPage }>(url, {cache: 'no-cache'});
        return response?.page ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("fetchPage()", err.message);
            return Promise.reject(err);
        }
        debug("fetchPage()", err);
        return Promise.reject(new Error('Error in fetchPage()'));
    }
}
